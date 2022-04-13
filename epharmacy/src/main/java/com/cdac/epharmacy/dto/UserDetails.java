package com.cdac.epharmacy.dto;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetails {
	private String firstName;
	private String lastName;
	private String email;
	private String phone;	
	private int flatNo;
	private String societyName;
	private String area;
	private String city;
	private String state;
	private String pinCode;
}
