<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'testSetup.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   <hr>
	组织<hr /><br/>
	<table width="800" border="1">
	  <tr>
	    <td>组织</td>
	    <td>全名</td>
	    <td>管理员</td>
	    <td>管理员邮箱</td>
	    <td>包含IP段</td>
	    <td>不包含IP段</td>
	    <td>探测器</td>
	    <td>最多设备</td>
	    <td>电话</td>
	    <td>地址</td>
	    <td>描述</td>
	  </tr>
	  
	  <tr>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	  </tr>
	</table>
	
	<form action="" method="post">
<table width="400" border="1">
  <tr>
    <td>组织</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>全名</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>管理员用户名</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>管理员密码</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>管理员邮箱</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>包含IP段</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>不包含IP段</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>探测器</td>
    <td> <table width="300" border="1">
      <tr>
        <td>采集器名称</td>
        <td>默认EPS</td>
        <td>开始时间</td>
        <td>结束时间</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>最多设备</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>电话</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>地址</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td>描述</td>
    <td>&nbsp;<input type="text" name="" /></td>
  </tr>
  <tr>
    <td align="center" colspan="2">新建--更新</td>
  </tr>
</table>
</form>

<hr />
凭据
<hr />
<table width="400" border="1">
  <tr>
    <td>名称</td>
    <td>协议</td>
    <td>设备类型</td>
    <td>用户名</td>
    <td>描述</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<form action="" method="post">
  <table width="400" border="1">
    <tr>
      <td>名称</td>
      <td>&nbsp;<input type="text" name="" /></td>
    </tr>
    <tr>
      <td>设备类型</td>
      <td>&nbsp;<select></select></td>
    </tr>
    <tr>
      <td>链接协议</td>
      <td>&nbsp;<select name="select">
      </select>
      </td>
    </tr>
    <tr>
      <td>端口</td>
      <td>&nbsp;<input type="text" name="" /></td>
    </tr>
    <tr>
      <td>用户名</td>
      <td>&nbsp;<input type="text" name="" /></td>
    </tr>
    <tr>
      <td>密码</td>
      <td>&nbsp;<input type="text" name="" /></td>
    </tr>
    <tr>
      <td>描述</td>
      <td>&nbsp;<input type="text" name="" /></td>
    </tr>
    <tr>
      <td align="center" colspan="2">&nbsp;新建--更新</td>
    </tr>
  </table>
</form>

<hr />
域RANGE
<hr />
<form action="" method="post">
<select>
	<option>采集器1</option>
	<option>采集器2</option>
</select>
<table width="400" border="1">
	<tr>
		<td>IP段</td>
		<td>凭据名</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
	</tr>
</table>
<table width="400" border="1">
	<tr>
		<td>IP段</td>
		<td><input type="text" name=""/></td>
	</tr>
	<tr>
		<td>凭据</td>
		<td>
			<select>
				<option>凭据名1</option>
			</select>
		</td>
	</tr>
	<tr>
		<td colspan="2" align="right"><font color="red">+</font> <font color="green">-</font> </td>
	</tr>
	<tr>
		<td colspan="2">新建--更新</td>
	</tr>
</table>
</form>

<hr />
探测
<hr />
<form action="" method="post">
<select>
	<option>采集器1</option>
	<option>采集器2</option>
</select>
<table width="400" border="1">
  <tr>
    <td>名称</td>
    <td>类型</td>
    <td>根IP</td>
    <td>包含的段</td>
    <td>不包含的段</td>
    <td>最新探测时间</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

<table width="400" border="1">
  <tr>
    <td>名称</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>探测类型</td>
    <td><select>
    	<option>智能扫描</option>
    	<option>范围扫描</option>
    	<option>扫描--</option>
    </select></td>	
  </tr>
  <tr>
    <td>Root IPs</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>包含的段</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>不包换段</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2"><input type="checkbox">探测之前不要执行Ping</td>
  </tr>
  <tr>
    <td colspan="2"><input type="checkbox">仅在探测是Ping</td>
  </tr>
  <tr>
    <td align="center"colspan="2">新建--更新</td>
  </tr>
</table>
</form>
  </body>
</html>
