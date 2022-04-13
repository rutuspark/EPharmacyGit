package com.cdac.epharmacy.service.impl;

import com.cdac.epharmacy.dao.CategoryRepository;
import com.cdac.epharmacy.dao.UserAddressRepository;
import com.cdac.epharmacy.dao.UserRepository;
import com.cdac.epharmacy.dto.LoginRequest;
import com.cdac.epharmacy.dto.UserDTO;
import com.cdac.epharmacy.models.User;
import com.cdac.epharmacy.models.UserAddress;
import com.cdac.epharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserAddressRepository userAddressRepository;
	
	@Autowired
	private CategoryRepository cateRepo;
	
	@Override
	public User authenticateUser(LoginRequest loginRequest) {
		return userRepository.getUserByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
	}
	
	@Override
	public String createAccount(User user) {
		User u = userRepository.save(user);
		UserAddress add = new UserAddress();
		add.setCity("Pune");
		add.setState("Maharashtra");
		add.setUser(u);
		userAddressRepository.save(add);
		return "SignUp successfully";
	}
	
	@Override
	public User editProfile(long userId, UserDTO userDTO) {
		User user = userRepository.findById(userId).get();
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setPhone(userDTO.getPhone());
		return user;
	}
	
	@Override
	public String changePassword(long userId, String pwd) {
		User u = userRepository.findById(userId).get();
		u.setPassword(pwd);
		return "Password Changed successfully";
	}
	
	@Override
	public UserAddress getAddress(long userId) {
		User u = userRepository.findById(userId).get();
		return userAddressRepository.findByUser(u);
	}
	
	@Override
	public String editAddress(long userId, UserAddress address) {
		User u = userRepository.findById(userId).get();
		UserAddress add = userAddressRepository.findByUser(u);

		System.out.println("address : "+add);
		if(add != null) {
		add.setArea(address.getArea());
		add.setCity(address.getCity());
		add.setFlatNo(address.getFlatNo());
		add.setPinCode(address.getPinCode());
		add.setSocietyName(address.getSocietyName());
		add.setState(address.getState());
		}
		return "Address Changed successfully";
	}
}
