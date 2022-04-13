package com.cdac.epharmacy.models;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAddress {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userAddressId;

	private int flatNo;

	@Column(length = 20)
	private String societyName;

	@Column(length = 20)
	private String area;

	@Column(length = 20)
	private String city;

	@Column(length = 20)
	private String state;

	@Column(length = 20)
	private String pinCode;

	@CreatedDate
	private LocalDateTime createdDate;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

}