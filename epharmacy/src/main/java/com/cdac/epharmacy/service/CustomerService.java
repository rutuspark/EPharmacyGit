package com.cdac.epharmacy.service;

import com.cdac.epharmacy.dto.ProductCart;
import com.cdac.epharmacy.dto.SubmitOrder;
import com.cdac.epharmacy.dto.UserDetails;
import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Order;
import com.cdac.epharmacy.models.Product;

import java.util.List;

public interface CustomerService {
	List<Product> getAllProduct(long categoryId);
	Product getProductById(long productId);
	String addProductToCart(ProductCart c);
	Order getCartByuserId(long userId);
	String deleteItemFromCart(long orderItemId);
	List<Category> getAllCategoryList();
	String submitOrder(SubmitOrder order);
	
	List<Order> getPendingOrders();
	
	List<Order> getDeliveredOrders();
	
	Order getOrderDetails(Long orderId);
	String deliverOrder(SubmitOrder order);
	List<Order> getAllOrderDetailsUserId(long userId);
	UserDetails getUserDetails(long orderId);

}
