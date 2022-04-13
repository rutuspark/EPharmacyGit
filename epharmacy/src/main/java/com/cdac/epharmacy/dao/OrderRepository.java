package com.cdac.epharmacy.dao;

import com.cdac.epharmacy.models.Order;
import com.cdac.epharmacy.models.OrderStatus;
import com.cdac.epharmacy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> getByOrderStatusAndUser(OrderStatus orderStatus, User user);
    List<Order> getByUser(User user);
    
    List<Order> getByOrderStatus(OrderStatus orderStatus);

}