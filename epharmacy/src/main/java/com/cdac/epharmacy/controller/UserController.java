package com.cdac.epharmacy.controller;

import com.cdac.epharmacy.dto.LoginRequest;
import com.cdac.epharmacy.dto.ResponseDTO;
import com.cdac.epharmacy.dto.UserDTO;
import com.cdac.epharmacy.models.User;
import com.cdac.epharmacy.models.UserAddress;
import com.cdac.epharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseDTO<?> authenticateUser(@RequestBody LoginRequest loginRequest){
		System.out.println("in authenticateUser: "+loginRequest);
		try {		
			User u = userService.authenticateUser(loginRequest);
			System.out.println("User : "+u);
			return new ResponseDTO<>(HttpStatus.OK, "User Added", u);
		}catch (RuntimeException e) {
			System.out.println("err in authenticateUser : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "User Not Added", null);
		}
	}
	
	@PostMapping("/signup")
	public ResponseDTO<?> createAccount(@RequestBody User user){
		System.out.println("in createAccount: "+user);
		try {		
			return new ResponseDTO<>(HttpStatus.OK, "User Added", userService.createAccount(user));
		}catch (RuntimeException e) {
			System.out.println("err in createAccount : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "User Not Added", null);
		}
	}
	
	@PutMapping("/edit-profile/{userId}")
	public ResponseDTO<?> editProfile(@PathVariable long userId,@RequestBody UserDTO userDTO){
		System.out.println("in editProfile: "+userDTO);
		try {	
			return new ResponseDTO<>(HttpStatus.OK, "Edit User Success", userService.editProfile(userId, userDTO));
		}catch (RuntimeException e) {
			System.out.println("err in editProfile : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Edit User Failed", null);
		}
	}
	
	@PutMapping("/changepwd/{userId}/{pwd}")
	public ResponseDTO<?> changePassword(@PathVariable long userId,@PathVariable String pwd){
		System.out.println("in changePassword: "+userId + "Pass : "+pwd);
		try {	
			return new ResponseDTO<>(HttpStatus.OK, "Password Changed successfully", userService.changePassword(userId, pwd));
		}catch (RuntimeException e) {
			System.out.println("err in changePassword : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Password Changed Failed", null);
		}
	}
	
	@GetMapping("/address/{userId}")
	public ResponseDTO<?> getAddress(@PathVariable long userId){
		System.out.println("in userId: "+userId);
		try {	
			return new ResponseDTO<>(HttpStatus.OK, "Address Added", userService.getAddress(userId));
		}catch (RuntimeException e) {
			System.out.println("err in userId : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Address Not Added", null);
		}
	}
	
	@PutMapping("/address/{userId}")
	public ResponseDTO<?> editAddress(@PathVariable long userId,@RequestBody UserAddress address){
		System.out.println("in editAddress: "+userId + "Address : "+address);
		try {	
			return new ResponseDTO<>(HttpStatus.OK, "Address Changed successfully", userService.editAddress(userId, address));
		}catch (RuntimeException e) {
			System.out.println("err in editAddress : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Address Changed Failed", null);
		}
	}

}
