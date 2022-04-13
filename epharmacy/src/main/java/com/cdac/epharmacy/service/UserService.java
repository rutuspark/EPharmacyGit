package com.cdac.epharmacy.service;

import com.cdac.epharmacy.dto.LoginRequest;
import com.cdac.epharmacy.dto.UserDTO;
import com.cdac.epharmacy.models.User;
import com.cdac.epharmacy.models.UserAddress;

public interface UserService {
	User authenticateUser(LoginRequest loginRequest);
	
	String createAccount(User user);
	
	User editProfile(long userId, UserDTO userDTO);
	
	String changePassword(long userId, String pwd);
	
	UserAddress getAddress(long userId);
	
	String editAddress(long userId, UserAddress address);

}
