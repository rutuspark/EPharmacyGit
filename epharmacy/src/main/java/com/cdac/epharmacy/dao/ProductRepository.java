package com.cdac.epharmacy.dao;

import com.cdac.epharmacy.models.Category;
import com.cdac.epharmacy.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> getByCategory(Category category);
}