package com.sofisoft.retailmanagement.repository;

import com.sofisoft.retailmanagement.entity.Performance;
import com.sofisoft.retailmanagement.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    List<Performance> findByStore(Store store);
    
    List<Performance> findByStoreAndPeriodeBetween(Store store, LocalDate startDate, LocalDate endDate);
    
    Optional<Performance> findByStoreAndPeriode(Store store, LocalDate periode);
    
    @Query("SELECT p FROM Performance p WHERE p.periode BETWEEN :startDate AND :endDate ORDER BY p.periode DESC")
    List<Performance> findByPeriodeBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT p FROM Performance p WHERE p.store.id IN :storeIds AND p.periode BETWEEN :startDate AND :endDate")
    List<Performance> findByStoreIdsAndPeriodeBetween(@Param("storeIds") List<Long> storeIds, 
                                                     @Param("startDate") LocalDate startDate, 
                                                     @Param("endDate") LocalDate endDate);
    
    @Query("SELECT AVG(p.ca) FROM Performance p WHERE p.periode = :periode")
    Double findAverageCaByPeriode(@Param("periode") LocalDate periode);
    
    @Query("SELECT AVG(p.tickets) FROM Performance p WHERE p.periode = :periode")
    Double findAverageTicketsByPeriode(@Param("periode") LocalDate periode);
}