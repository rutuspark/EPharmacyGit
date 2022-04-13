package com.cdac.epharmacy.service.impl;

import com.cdac.epharmacy.dao.*;
import com.cdac.epharmacy.dto.ProductCart;
import com.cdac.epharmacy.dto.SubmitOrder;
import com.cdac.epharmacy.dto.UserDetails;
import com.cdac.epharmacy.models.*;
import com.cdac.epharmacy.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private UserAddressRepository userAddressRepository;

	@Override
	public List<Product> getAllProduct(long categoryId) {
		Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
		List<Product> productList = productRepository.getByCategory(categoryOptional.get());
		return productList.stream()
				.filter(product -> product.getQuantity()!=0)
				.collect(Collectors.toList());
	}

	@Override
	public Product getProductById(long productId) {
		return productRepository.findById(productId).get();
	}
	
	@Override
	public String addProductToCart(ProductCart productCart) {
		Product product = getProductById(productCart.getProductId());

		User user = userRepository.getById(productCart.getUserId());

		Optional<Order> currentOrderOptional = orderRepository.getByOrderStatusAndUser(OrderStatus.InCart, user);

		if (currentOrderOptional.isPresent()) {
			Order order = currentOrderOptional.get();
			List<OrderItem> orderItems = order.getOrderItems();

			List<OrderItem> orderItemList = orderItems.stream()
					.filter(orderItem -> orderItem.getProduct().getProductId()
							== productCart.getProductId())
					.collect(Collectors.toList());
			if (orderItemList.size() == 1) {
				Long quantity = orderItemList.get(0).getQuantity();
				orderItemList.get(0).setQuantity(quantity + productCart.getQuantity());
				orderItemList.get(0).setTotal(orderItemList.get(0).getTotal()*(quantity + productCart.getQuantity()));
			} else {
				OrderItem orderItem = new OrderItem();

				orderItem.setPrice(product.getPrice());
				orderItem.setProduct(product);
				orderItem.setQuantity(productCart.getQuantity());
				orderItem.setTotal(product.getPrice()*productCart.getQuantity());
				orderItems.add(orderItem);
				order.setOrderItems(orderItems);
				orderItem.setOrder(order);
				orderItem.setCreatedDate(LocalDateTime.now());
			}
			order.setOrderTotal(calculateOrderTotal(orderItems));
			orderRepository.save(order);

			return "!!! Items Added to Cart !!!";
		} else {

			OrderItem orderItem = new OrderItem();

			orderItem.setPrice(product.getPrice());
			orderItem.setProduct(product);
			orderItem.setQuantity(productCart.getQuantity());
			orderItem.setTotal(product.getPrice()*productCart.getQuantity());
			orderItem.setCreatedDate(LocalDateTime.now());
			//orderItemRepository.save(orderItem);

			Order order = new Order();
			List<OrderItem> orderItems = new ArrayList<>();
			orderItems.add(orderItem);
			order.setOrderItems(orderItems);
			order.setOrderStatus(OrderStatus.InCart);
			order.setPaymentType(PaymentType.Cash);
			order.setUser(user);
			order.setOrderTotal(calculateOrderTotal(orderItems));
			orderItem.setOrder(order);
			order.setCreatedDate(LocalDateTime.now());
			orderRepository.save(order);

			return "!!! Items Added to Cart !!!";
		}
	}
	
	public static Double calculateOrderTotal(List<OrderItem> orderItems) {
		double sum = orderItems.stream().mapToDouble(o -> o.getTotal()).sum();
		return sum;
	}
	
	@Override
	public Order getCartByuserId(long userId) {
		User user = userRepository.getById(userId);
		Optional<Order> currentOrderOptional = orderRepository.getByOrderStatusAndUser(OrderStatus.InCart, user);
		
		return currentOrderOptional.get();
	}
	
	@Override
	public String deleteItemFromCart(long orderItemId) {
		orderItemRepository.deleteById(orderItemId);
		return "Items Deleted from Cart";
	}

	@Override
	public List<Category> getAllCategoryList() {
		return categoryRepository.findAll();
	}

	@Override
	public String submitOrder(SubmitOrder order) {
		
		Order currentOrder = orderRepository.getById(order.getOrderId());

		currentOrder.setPaymentType(order.getPaymentType());
		currentOrder.setOrderStatus(OrderStatus.Submitted);

		orderRepository.save(currentOrder);
		return "Order Submitted Successfully";
		
	}
	
	@Override
	public List<Order> getPendingOrders() {
		return orderRepository.getByOrderStatus(OrderStatus.Submitted);
	}
	
	@Override
	public List<Order> getDeliveredOrders() {
		return orderRepository.getByOrderStatus(OrderStatus.Delivered);
	}

	@Override
	public Order getOrderDetails(Long orderId) {
		Order order= orderRepository.findById(orderId).get();
		return order;
	}
	
	@Override
	public String deliverOrder(SubmitOrder order) {
		Order currentOrder = orderRepository.getById(order.getOrderId());

		for(int i=0;i<currentOrder.getOrderItems().size();i++) {
			OrderItem orderItem = currentOrder.getOrderItems().get(i);
			Product product =  productRepository.getById(orderItem.getProduct().getProductId());
			product.setQuantity(product.getQuantity()-orderItem.getQuantity());
			productRepository.save(product);
		}
		
		currentOrder.setOrderStatus(OrderStatus.Delivered);
		currentOrder.setDeliveredDate(LocalDateTime.now());		
		
		orderRepository.save(currentOrder);
		return "Order Submitted Successfully";
		
	}

	@Override
	public List<Order> getAllOrderDetailsUserId(long userId) {
		User user = userRepository.getById(userId);
		return orderRepository.getByUser(user);
	}
	
	@Override
	public UserDetails getUserDetails(long orderId) {
		Order order= orderRepository.findById(orderId).get();
		User user = order.getUser();
		
		UserAddress userAddress= userAddressRepository.findByUser(user);
		
		return UserDetails.builder().firstName(user.getFirstName())
		.lastName(user.getLastName())
		.email(user.getEmail())
		.phone(user.getPhone())
		.flatNo(userAddress.getFlatNo())
		.societyName(userAddress.getSocietyName())
		.area(userAddress.getArea())
		.city(userAddress.getCity())
		.pinCode(userAddress.getPinCode())
		.state(userAddress.getState()).build();
	}
	
	/*@Override
	public List<Product> getProductListByName(String productName) {
		List<Product> list = productRepo.getProductListByName(productName);
		List<Product> lt = new ArrayList<Product>();
		int index = 0;
		for(index = 0; index < list.size(); index++) {
			Product p = list.get(index);
			if(p.getQty() > 0)
				lt.add(p);
		}
		return lt;
	}
	public int addOrder(int userId, double totalPrice) {
		Orders order = new Orders();
		order.setDeliveryDate(LocalDate.now().plusDays(3));
		order.setOrderDeliveryStatus(OrderStatus.PENDING);
		order.setOrderDate(LocalDate.now());
		order.setTotalPrice(totalPrice);	
		order.setSelectedCustomer(userRepo.findById(userId).get());
		 List<Integer> list = userRepo.getAllDeliveryBoy(Role.DELIVERY_BOY);
		Random r = new Random();
		CustomerServiceImpl.deliveryBoyId = list.get(r.nextInt(list.size()));
		if(CustomerServiceImpl.deliveryBoyId == 0 )
			CustomerServiceImpl.deliveryBoyId = 1;
		System.out.println(CustomerServiceImpl.deliveryBoyId);
		order.setSelectedDeliveryBoy(userRepo.findById(CustomerServiceImpl.deliveryBoyId).get());	
		return ordersrepo.save(order).getId();
	}
	
	@Override
	public int addOrdersDetails(int userId, int orderId) {
		Orders orders = ordersrepo.findById(orderId).get();
		User user = userRepo.findById(userId).get();
		List<Cart> items = cartRepo.getCartByuserId(userId);
		for (Cart cart : items) {
			Product p = productRepo.findByProductNameAndGrams(cart.getProductName(), cart.getGrams());
			int qty = p.getQty() - cart.getQty();
			p.setQty(qty);
			OrderDetails od = new OrderDetails();
			od.setFinalPrice(cart.getFinalPrice());
			od.setGrams(cart.getGrams());
			od.setProductName(cart.getProductName());
			od.setQty(cart.getQty());
			od.setSelectedOrder(orders);
			od.setSelectedUser(user);
			ordersDetailsRepo.save(od);
		}
		
		cartRepo.deleteByUserId(userId);
		return CustomerServiceImpl.deliveryBoyId;
	}
	
	@Override
	public String addPayment(PaymentDTO paymentDTO) {
		Payment payment = new Payment();
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(PaymentStatus.PAID);
		if(paymentDTO.getPaymentType().equals("CREDIT"))
			payment.setPaymentType(PaymentType.CREDIT);
		if(paymentDTO.getPaymentType().equals("DEBIT"))
			payment.setPaymentType(PaymentType.DEBIT);
		User d = userRepo.findById(paymentDTO.getDeliveryBoyId()).get();
		Orders o = ordersrepo.findById(paymentDTO.getOrderId()).get();
		payment.setSelectedDeliveryBoyForPayment(d);
		payment.setSelectedOrder(o);
		paymentRepo.save(payment);
		return "Payment Done";
	}
	
	@Override
	public List<Orders> getOrdersList(int userId) {
		
		return ordersrepo.findByselectedCustomer(userRepo.findById(userId).get());
	}
	
	@Override
	public List<OrderDetails> getOrdersDetailsList(int orderId) {
		List<OrderDetails> list = ordersDetailsRepo.findBySelectedOrder(ordersrepo.findById(orderId).get());
		System.out.println("list : "+ list);
		return list;
	}
	
	@Override
	public String updateCartItems(int userId) {
		List<Cart> list = cartRepo.findByUserId(9999);
		for (Cart cart : list) {
			cart.setUserId(userId);
		}
		return "Cart Updated";
	}
	
	@Override
	public List<Orders> getOrdersListForDBoy(int deliveryBoyId) {
		return ordersrepo.findBySelectedDeliveryBoy(userRepo.findById(deliveryBoyId).get());
	}
	
	@Override
	public String deliveredOrder(int orderId) {
		Orders o = ordersrepo.findById(orderId).get();
		o.setOrderDeliveryStatus(OrderStatus.DELIVERED);
		o.setDeliveryDate(LocalDate.now());
		return "Order delivered";
	}
	
	@Override
	public List<Orders> getAllOrderList() {		
		return ordersrepo.findAll();
	}

	
	@Override
	public List<Product> getProductsForHomePage() {
		List<Product> list = productRepo.findAll();
		
		List<Product> lt = new ArrayList<Product>();
		int index = 0;
		for(index = 0; index < list.size(); index++) {
			Product p = list.get(index);
			if(p.getDiscount() >= 20)
				lt.add(p);
		}
		return lt;
	}
	
	@Override
	public int addOrderAddress(OrderAddress oa) {
		return orderAddressRepo.save(oa).getId();
	}
	
	@Override
	public String addOrderIdtoOrderAddress(int aId, int oId) {
		OrderAddress ao = orderAddressRepo.findById(aId).get();
		ao.setOrderId(oId);
		return "Done";
	}
	
	@Override
	public OrderAddress getOrderAddress(int oId) {
		
		return orderAddressRepo.findByOrderId(oId);
	}*/
}
