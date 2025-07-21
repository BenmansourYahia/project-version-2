package com.sofisoft.retailmanagement.repository;

import com.sofisoft.retailmanagement.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByCode(String code);
    
    List<Store> findByBrand(String brand);
    
    List<Store> findByStatus(String status);
    
    @Query("SELECT s FROM Store s WHERE s.name LIKE %:name% OR s.code LIKE %:code%")
    List<Store> findByNameContainingOrCodeContaining(@Param("name") String name, @Param("code") String code);
    
    @Query("SELECT s FROM Store s WHERE s.lastUpdate < :cutoffDate")
    List<Store> findStoresWithOldData(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    @Query("SELECT DISTINCT s.brand FROM Store s ORDER BY s.brand")
    List<String> findAllBrands();
    
    @Query("SELECT DISTINCT SUBSTRING(s.address, LOCATE(',', s.address) + 2) as region FROM Store s ORDER BY region")
    List<String> findAllRegions();
}