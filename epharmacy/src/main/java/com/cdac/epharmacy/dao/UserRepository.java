package com.cdac.epharmacy.dao;

import com.cdac.epharmacy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getUserByEmailAndPassword(String email, String password);

}