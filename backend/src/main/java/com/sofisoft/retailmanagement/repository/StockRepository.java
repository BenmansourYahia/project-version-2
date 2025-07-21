package com.sofisoft.retailmanagement.repository;

import com.sofisoft.retailmanagement.entity.Stock;
import com.sofisoft.retailmanagement.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByStore(Store store);
    
    List<Stock> findByStatus(String status);
    
    List<Stock> findByStoreAndStatus(Store store, String status);
    
    Optional<Stock> findByCode(String code);
    
    @Query("SELECT s FROM Stock s WHERE s.designation LIKE %:designation% OR s.code LIKE %:code%")
    List<Stock> findByDesignationContainingOrCodeContaining(@Param("designation") String designation, @Param("code") String code);
    
    @Query("SELECT s FROM Stock s WHERE s.quantite <= s.seuil")
    List<Stock> findLowStockItems();
    
    @Query("SELECT s FROM Stock s WHERE s.quantite = 0")
    List<Stock> findOutOfStockItems();
}