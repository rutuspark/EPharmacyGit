package com.cdac.epharmacy.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "product_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	@Column
	private String name;

	@Column
	private String description;

	@Column
	private Double price;

	@Column
	private Long quantity;

	@Column
	private String productImage;

	@CreatedDate
	private LocalDateTime createdDate;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Category category;

}