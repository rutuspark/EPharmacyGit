package com.cdac.epharmacy.service.impl;

import com.cdac.epharmacy.dao.CategoryRepository;
import com.cdac.epharmacy.dao.ProductRepository;
import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Product;
import com.cdac.epharmacy.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ProductRepository productRepository;

	@Override
	public Category addCategoryToInventory(Category category) {
		category.setCreatedDate(LocalDateTime.now());
		return categoryRepository.save(category);
	}

	@Override
	public Product addProductToInventory(Long categoryId, Product product) {
		Optional<Category> c = categoryRepository.findById(categoryId);
		product.setCategory(c.get());
		product.setCreatedDate(LocalDateTime.now());
		return productRepository.save(product);
	}
	
	@Override
	public Product updateProductToInventory(Long productId, Product product) {
		Optional<Product> c = productRepository.findById(productId);
		Product updatedProduct = c.get();
		updatedProduct.setName(product.getName());
		updatedProduct.setDescription(product.getDescription());
		updatedProduct.setPrice(product.getPrice());
		updatedProduct.setQuantity(product.getQuantity());
		updatedProduct.setProductImage(product.getProductImage());
		
		return productRepository.save(updatedProduct);
	}
	
	@Override
	public Long deleteProductToInventory(Long productId) {
		//Optional<Product> c = productRepository.findById(productId);
		//product.setUpdated(LocalDateTime.now());
		productRepository.deleteById(productId);
		return productId;
	}
	
	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
}
