package by.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import by.domain.User;



@Controller
public class CMDBController {

	@RequestMapping(value="queryAllDevice")

	public void queryAllDevice(@RequestBody List<User> users){
		System.out.println("ssss");
		System.out.println(users);
    

		
		
		
	}
	

	@RequestMapping(value="/queryDeviceDetail")
	public void queryDeviceDetail( String deviceId ){
		
		
		
		
		
		
		
		
	}
	
	
}
