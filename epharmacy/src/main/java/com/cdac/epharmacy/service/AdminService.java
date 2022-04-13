package com.cdac.epharmacy.service;

import java.util.List;

import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Product;

public interface AdminService {

	Category addCategoryToInventory(Category category);

	Product addProductToInventory(Long categoryId, Product product);
	
	Product updateProductToInventory(Long productId, Product product);

	public Long deleteProductToInventory(Long productId);

	List<Product> getAllProducts();
	
	
}
