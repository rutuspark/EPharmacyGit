package com.cdac.epharmacy.dao;

import com.cdac.epharmacy.models.User;
import com.cdac.epharmacy.models.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {

    UserAddress findByUser(User user);
}