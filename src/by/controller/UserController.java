package by.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import by.domain.UserVo;
import by.service.UserService;



@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//用户登录验证
	@RequestMapping(value="/login")
	public String loginCheck(@ModelAttribute UserVo vo){
		System.out.println("login");
        boolean flag = false;
		if(vo.getDomain().equals("local"))    
        	flag = userService.checkLogin(vo);
	    System.out.println(flag);
	    return "main";
	}
	
}
