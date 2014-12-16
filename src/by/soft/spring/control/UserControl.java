package by.soft.spring.control;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import by.soft.spring.domain.UserVo;
import by.soft.spring.service.UserService;


@Controller
public class UserControl {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/login")
	public void hello(HttpServletRequest request,HttpServletResponse response){
		
		boolean flag = false;
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");

		System.out.println(userName);
		System.out.println(password);
		flag = userService.checkUser(userName, password);
		
		System.out.println(flag);
		
	}
	

}
