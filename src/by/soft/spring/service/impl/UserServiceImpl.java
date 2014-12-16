package by.soft.spring.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.soft.spring.service.UserService;


@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Override
	public boolean checkUser(String userName, String password) {
		if(userName.equals("yang")&&password.equals("123"))
			return true;
		return false;
	}

}
