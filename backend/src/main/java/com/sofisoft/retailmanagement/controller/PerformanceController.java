package com.sofisoft.retailmanagement.controller;

import com.sofisoft.retailmanagement.dto.PerformanceDTO;
import com.sofisoft.retailmanagement.entity.Performance;
import com.sofisoft.retailmanagement.entity.Store;
import com.sofisoft.retailmanagement.repository.PerformanceRepository;
import com.sofisoft.retailmanagement.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/performances")
public class PerformanceController {

    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private StoreRepository storeRepository;

    @GetMapping
    public ResponseEntity<List<PerformanceDTO>> getAllPerformances() {
        List<Performance> performances = performanceRepository.findAll();
        List<PerformanceDTO> performanceDTOs = performances.stream()
                .map(PerformanceDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(performanceDTOs);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<PerformanceDTO>> getPerformancesByStore(@PathVariable Long storeId) {
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isPresent()) {
            List<Performance> performances = performanceRepository.findByStore(store.get());
            List<PerformanceDTO> performanceDTOs = performances.stream()
                    .map(PerformanceDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(performanceDTOs);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/period")
    public ResponseEntity<List<PerformanceDTO>> getPerformancesByPeriod(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Performance> performances = performanceRepository.findByPeriodeBetween(startDate, endDate);
        List<PerformanceDTO> performanceDTOs = performances.stream()
                .map(PerformanceDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(performanceDTOs);
    }

    @GetMapping("/store/{storeId}/period")
    public ResponseEntity<List<PerformanceDTO>> getPerformancesByStoreAndPeriod(
            @PathVariable Long storeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isPresent()) {
            List<Performance> performances = performanceRepository.findByStoreAndPeriodeBetween(store.get(), startDate, endDate);
            List<PerformanceDTO> performanceDTOs = performances.stream()
                    .map(PerformanceDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(performanceDTOs);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PerformanceDTO> createPerformance(@RequestBody Performance performance) {
        Performance savedPerformance = performanceRepository.save(performance);
        return ResponseEntity.ok(new PerformanceDTO(savedPerformance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceDTO> updatePerformance(@PathVariable Long id, @RequestBody Performance performanceDetails) {
        Optional<Performance> optionalPerformance = performanceRepository.findById(id);
        if (optionalPerformance.isPresent()) {
            Performance performance = optionalPerformance.get();
            performance.setCa(performanceDetails.getCa());
            performance.setTickets(performanceDetails.getTickets());
            performance.setPrixMoyen(performanceDetails.getPrixMoyen());
            performance.setDebitMoyen(performanceDetails.getDebitMoyen());
            performance.setTauxTransformation(performanceDetails.getTauxTransformation());
            performance.setQuantiteVendue(performanceDetails.getQuantiteVendue());
            performance.setObjectif(performanceDetails.getObjectif());
            Performance updatedPerformance = performanceRepository.save(performance);
            return ResponseEntity.ok(new PerformanceDTO(updatedPerformance));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerformance(@PathVariable Long id) {
        if (performanceRepository.existsById(id)) {
            performanceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}