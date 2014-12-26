package by.service.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import by.domain.UserVo;
import by.mybatis.dao.UserMapper;
import by.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Resource
	private UserMapper userMapper;
	@Override
	public boolean checkLogin(UserVo vo) {
		boolean flag = false;	
		UserVo userVo = userMapper.checkUser(vo);
		if(userVo != null)
			flag = true;
		return flag;
	}

}