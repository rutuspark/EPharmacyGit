package com.cdac.epharmacy.controller;

import com.cdac.epharmacy.dto.ProductCart;
import com.cdac.epharmacy.dto.ResponseDTO;
import com.cdac.epharmacy.dto.SubmitOrder;
import com.cdac.epharmacy.dto.UserDetails;
import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Order;
import com.cdac.epharmacy.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController {
	
	@Autowired
	private CustomerService custService;

	@GetMapping("/product/list/{categoryId}")
	public ResponseDTO<?> getAllProductList(@PathVariable long categoryId){
		System.out.println("in getAllProductList: "+categoryId);
		try {		
			return new ResponseDTO<>(HttpStatus.OK, "Product List Added", custService.getAllProduct(categoryId));
		}catch (RuntimeException e) {
			System.out.println("err in getAllProductList : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Product List Not Added", null);
		}
	}
	
	@GetMapping("/product/{productId}")
	public ResponseDTO<?> getProductById(@PathVariable String productId){
		System.out.println("in getProductById: "+productId);
		try {		
			return new ResponseDTO<>(HttpStatus.OK, "Product Added", custService.getProductById(Long.valueOf(productId)));
		}catch (RuntimeException e) {
			System.out.println("err in getProductById : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Product Not Added", null);
		}
	}
	
	@PostMapping("/cart")
	public ResponseDTO<?> addProductToCart(@RequestBody ProductCart productCart){
		System.out.println("in addProductToCart: "+productCart);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Product Added to cart", custService.addProductToCart(productCart));
		}catch (RuntimeException e) {
			System.out.println("err in addProductToCart : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Product Not Added to cart", null);
		}
	}
	
	@PostMapping("/submit")
	public ResponseDTO<?> submitOrder(@RequestBody SubmitOrder order){
		System.out.println("in submitOrder: "+order);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Order Submitted Successfully", custService.submitOrder(order));
		}catch (RuntimeException e) {
			System.out.println("err in addProductToCart : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Product Not Added to cart", null);
		}
	}
	
	@GetMapping("/cart/{userId}")
	public ResponseDTO<?> getCartByuserId(@PathVariable long userId){
		System.out.println("in getCartByuserId: "+userId);
		try {
			Order order = custService.getCartByuserId(userId);
			System.out.println("Cart : "+order);
			return new ResponseDTO<>(HttpStatus.OK, "Cart Added", order);
		}catch (RuntimeException e) {
			System.out.println("err in getCartByuserId : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Cart Not Added", null);
		}
	}
	
	@DeleteMapping("/cart/{orderItemId}")
	public ResponseDTO<?> deleteItemFromCart(@PathVariable long orderItemId){
		System.out.println("in deleteItemFromCart: "+orderItemId);
		try {		
			return new ResponseDTO<>(HttpStatus.OK, "Item deleted from Cart", custService.deleteItemFromCart(orderItemId));
		}catch (RuntimeException e) {
			System.out.println("err in deleteItemFromCart : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Item not deleted from Cart", null);
		}
	}

	@GetMapping("/categorylist")
	public ResponseDTO<?> getAllCategoryList(){
		System.out.println("in getAllCategoryList");
		try {
			List<Category> list = custService.getAllCategoryList();
			System.out.println("Category list : "+list);
			return new ResponseDTO<>(HttpStatus.OK, "Category List added",list);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
	@GetMapping("/userDetails/{orderId}")
	public ResponseDTO<?> getUserDetails(@PathVariable long orderId){
		System.out.println("in getUserDetails");
		try {
			UserDetails list = custService.getUserDetails(orderId);
			System.out.println("Category list : "+list);
			return new ResponseDTO<>(HttpStatus.OK, "Category List added",list);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}

	@GetMapping("/pendingorders")
	public ResponseDTO<?> getPendingOrders(){
		System.out.println("in getPendingOrders");
		try {
			List<Order> list = custService.getPendingOrders();
			System.out.println("Order list : "+list);
			return new ResponseDTO<>(HttpStatus.OK, "Orders List added",list);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
	@GetMapping("/deliverorders")
	public ResponseDTO<?> getDeliveredOrders(){
		System.out.println("in getDeliveredOrders");
		try {
			List<Order> list = custService.getDeliveredOrders();
			System.out.println("Order list : "+list);
			return new ResponseDTO<>(HttpStatus.OK, "Orders List added",list);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
	@GetMapping("/order/{orderId}")
	public ResponseDTO<?> getOrderDetails(@PathVariable long orderId){
		System.out.println("in getOrderDetails");
		try {
			Order order = custService.getOrderDetails(orderId);
			System.out.println("Order list : "+order);
			return new ResponseDTO<>(HttpStatus.OK, "Orders List added",order);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
	@PostMapping("/deliver")
	public ResponseDTO<?> deliverOrder(@RequestBody SubmitOrder order){
		System.out.println("in deliverOrder: "+order);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Order delivered Successfully", custService.deliverOrder(order));
		}catch (RuntimeException e) {
			System.out.println("err in addProductToCart : "+e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Product Not Added to cart", null);
		}
	}
	
	@GetMapping("/order/history/{userId}")
	public ResponseDTO<?> getAllOrderDetailsUserId(@PathVariable long userId){
		System.out.println("in getOrderDetails");
		try {
			List<Order> order = custService.getAllOrderDetailsUserId(userId);
			System.out.println("Order list : "+order);
			return new ResponseDTO<>(HttpStatus.OK, "Orders List added",order);
		}catch (RuntimeException e) {
			System.out.println("err in getAllCategoryList");
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Category List Not added", null);
		}
	}
	
	
}
