package by.utils;

import java.util.Arrays;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



public class tableBase {


	
	
	public static void main(String[] args) {
	//columns
		   JSONArray columns = new JSONArray();
			JSONObject json1 = new JSONObject();
			JSONObject json2 = new JSONObject();
			JSONObject json3 = new JSONObject();
			JSONObject json4 = new JSONObject();
			json1.put("db", "username");
			json1.put("dt", "username");
			json2.put("db", "password");
			json2.put("dt", "username");
			json3.put("db", "name");
			json3.put("dt", "name");
			json4.put("db", "isAdmin");
			json4.put("dt", "isAdmin");
			columns.add(json1);
			columns.add(json2);
			columns.add(json3);
			columns.add(json4);
			System.out.println(columns.getJSONObject(0).get("dt"));
			System.out.println(columns.size());
	//requestColumns		
			 JSONArray requestColumns = new JSONArray();
			 json1.put("data", "username");
				json1.put("orderable", "true");
				json2.put("data", "password");
				json2.put("orderable", "true");
				json3.put("data", "name");
				json3.put("orderable", "true");
				json4.put("data", "isAdmin");
				json4.put("orderable", "true");
				requestColumns.add(json1);
				requestColumns.add(json2);
				requestColumns.add(json3);
				requestColumns.add(json4);
	//search			
				JSONObject search = new JSONObject();
				search.put("value", "yang");
	//order			
				 JSONArray order = new JSONArray();
				 json1.put("column", "3");
					json1.put("dir", "desc");
					json2.put("column", "1");
					json2.put("dir", "asc"); 
					order.add(json1);
					order.add(json2);
				 
			int start = 0 ;
			int length = 10;
		
		//	System.out.println(columns.getJSONObject(0).getString("dt"));
			
			
			String limit = tableBase.limitSql(start, length);
			String filter = tableBase.filterSql(search, columns);
			String ordersql = tableBase.orderSql(order, columns, requestColumns);
			System.out.println(limit);
			System.out.println(filter);
			System.out.println(ordersql);
	}
	
	
	public static void listAll( String table , String primaryKey ){
	
		JSONArray columns = new JSONArray();
		JSONObject json1 = new JSONObject();
		JSONObject json2 = new JSONObject();
		JSONObject json3 = new JSONObject();
		JSONObject json4 = new JSONObject();
		
		json1.put("db", "username");
		json1.put("dt", "username");
		json2.put("db", "password");
		json2.put("dt", "username");
		json3.put("db", "name");
		json3.put("dt", "name");
		json4.put("db", "isAdmin");
		json4.put("dt", "isAdmin");
		columns.add(json1);
		columns.add(json2);
		columns.add(json3);
		columns.add(json4);
		System.out.println(columns.getJSONObject(0).get("dt"));

 	}
	
	
	//limit sql
		public static String limitSql(int start , int length){		
			String limitSql = null;
		if( start >=0 && length >= 0)
			limitSql = " limit " +start+","+length;
			return limitSql;		
		} 
	
		
   //order sql
	public static String orderSql(JSONArray order , JSONArray columns , JSONArray requestColumns){
		String orderSql = " ORDER BY ";
		if( order !=null && order.size() > 0 && columns.size() > 0 ){
			String[] orderBy = new String[50];
			String[] dtColumns = pluck(columns,"dt");
			for( int i = 0 ; i <order.size() ; i++ ){
				int columnIdx = Integer.parseInt((String) order.getJSONObject(i).get("column"));
				JSONObject requestColumn = requestColumns.getJSONObject(columnIdx);
				//columnIdx = Arrays.binarySearch(dtColumns, (String)requestColumn.get("data"));
                JSONObject column = columns.getJSONObject(columnIdx);
				if(requestColumn.get("orderable").equals("true")){
					String dir = (String)order.getJSONObject(i).get("dir");
					dir = dir.equals("asc") ? "ASC" : "DESC" ;
					orderBy[i] = column.get("db")+" "+dir;
					if(i<(order.size()-1))
					orderSql += orderBy[i]+",";
					else
					orderSql += orderBy[i];
				}
			}
		}
		return orderSql;
	}
	
	
/*	//filter sql
	public String filterSql(JSONObject search , JSONArray requestColumns , JSONArray columns){
		String filterSql = null;
		String[] globalSearch ;
		String[] columnSearch ;
		String[] dtColumns = pluck(columns , "dt");
		String str ;
		if( !search.getString("value").equals("")){
			 str = search.getString("value");
		for(int i = 0 ; i < requestColumns.size() ; i++ ){
			JSONObject requestColumn = requestColumns.getJSONObject(i);
			int columnIdx = Arrays.binarySearch(dtColumns, (String)requestColumn.get("data"));
			 JSONObject column = columns.getJSONObject(columnIdx);
			if(requestColumn.getString("searchable").equals("true")){	
				
			}
			
			
			
			
			
		}
		}
		return filterSql;
	}*/
	
	
	public static String filterSql(JSONObject search , JSONArray columns){
        String filterSql = "" ;
		String str = "" ;
		if( !search.getString("value").equals("")){
			 str = search.getString("value");
			 for(int i = 0 ; i < columns.size(); i++ ){
				 filterSql += columns.getJSONObject(i).getString("db")+" LIKE '%"+str+"%'";
				 if(i < columns.size()-1)
					 filterSql += " OR ";	 
			 }
	
		}
		return filterSql;
	}
	
	public static String[] pluck (JSONArray a , String b){
		
		String[] c = new String[100] ;
		
		for( int i = 0 ; i < a.size() ;i++ )
			c[i] = a.getJSONObject(i).getString(b);
		return c ; 
		
	}
 
}
