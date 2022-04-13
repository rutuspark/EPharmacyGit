package com.cdac.epharmacy.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.Entity;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	private int productId;
	private String productName;
	private String description;
	private int rating;
	private double price;
	private int discount;
	private double finalPrice;
	private int qty;
	private int grams;
	@JsonIgnoreProperties
	private int userId;
}
