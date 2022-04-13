package com.cdac.epharmacy.controller;

import com.cdac.epharmacy.dto.ResponseDTO;
import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Product;
import com.cdac.epharmacy.service.AdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	
	@Autowired
	private AdminService adminService;

	@PostMapping("/category")
	public ResponseDTO<?> addCategoryToInventory(@RequestBody Category category) {
		System.out.println("in add category : "+ category);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Added Category Successfully", adminService.addCategoryToInventory(category));
		}catch (RuntimeException e) {
			System.out.println("error in add category : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Add Category Failed", null);
		}
	}
	
	@PostMapping("/{categoryId}/product")
	public ResponseDTO<?> addProductToInventory(@PathVariable Long categoryId, @RequestBody Product product) {
		System.out.println("in add product : "+product);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Added Product Successfully", adminService.addProductToInventory(categoryId, product));
		}catch (RuntimeException e) {
			System.out.println("error in add product : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Add Product Failed", null);
		}
	}
	
	@PutMapping("/{productId}")
	public ResponseDTO<?> updateProductToInventory(@PathVariable Long productId, @RequestBody Product product) {
		System.out.println("in edit product : "+product);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Product updated Successfully", adminService.updateProductToInventory(productId, product));
		}catch (RuntimeException e) {
			System.out.println("error in add product : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Update Product Failed", null);
		}
	}

	@DeleteMapping("/{productId}")
	public ResponseDTO<?> deleteProductToInventory(@PathVariable Long productId) {
		System.out.println("in delete product : "+productId);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Product deleted Successfully", adminService.deleteProductToInventory(productId));
		}catch (RuntimeException e) {
			System.out.println("error in add product : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Update Product Failed", null);
		}
	}
	
	@GetMapping("/products")
	public ResponseDTO<?> getAllProducts(){
		System.out.println("in getAllProducts");
		try {
			List<Product> list = adminService.getAllProducts();
			System.out.println("Category list : "+list);
			return new ResponseDTO<>(HttpStatus.OK, "Category List added",list);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
}
