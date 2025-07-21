package com.sofisoft.retailmanagement.controller;

import com.sofisoft.retailmanagement.dto.PerformanceDTO;
import com.sofisoft.retailmanagement.dto.StoreDTO;
import com.sofisoft.retailmanagement.entity.Performance;
import com.sofisoft.retailmanagement.entity.Store;
import com.sofisoft.retailmanagement.repository.PerformanceRepository;
import com.sofisoft.retailmanagement.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @GetMapping
    public ResponseEntity<List<StoreDTO>> getAllStores() {
        List<Store> stores = storeRepository.findAll();
        List<StoreDTO> storeDTOs = stores.stream().map(store -> {
            StoreDTO dto = new StoreDTO(store);
            // Get latest performance for each store
            Optional<Performance> latestPerf = performanceRepository.findByStoreAndPeriode(store, LocalDate.now());
            if (latestPerf.isPresent()) {
                dto.setPerformance(new PerformanceDTO(latestPerf.get()));
            }
            return dto;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(storeDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getStoreById(@PathVariable Long id) {
        Optional<Store> store = storeRepository.findById(id);
        if (store.isPresent()) {
            StoreDTO dto = new StoreDTO(store.get());
            Optional<Performance> latestPerf = performanceRepository.findByStoreAndPeriode(store.get(), LocalDate.now());
            if (latestPerf.isPresent()) {
                dto.setPerformance(new PerformanceDTO(latestPerf.get()));
            }
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/brands")
    public ResponseEntity<List<String>> getAllBrands() {
        List<String> brands = storeRepository.findAllBrands();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/regions")
    public ResponseEntity<List<String>> getAllRegions() {
        List<String> regions = storeRepository.findAllRegions();
        return ResponseEntity.ok(regions);
    }

    @GetMapping("/search")
    public ResponseEntity<List<StoreDTO>> searchStores(@RequestParam String query) {
        List<Store> stores = storeRepository.findByNameContainingOrCodeContaining(query, query);
        List<StoreDTO> storeDTOs = stores.stream().map(StoreDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(storeDTOs);
    }

    @PostMapping
    public ResponseEntity<StoreDTO> createStore(@RequestBody Store store) {
        Store savedStore = storeRepository.save(store);
        return ResponseEntity.ok(new StoreDTO(savedStore));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreDTO> updateStore(@PathVariable Long id, @RequestBody Store storeDetails) {
        Optional<Store> optionalStore = storeRepository.findById(id);
        if (optionalStore.isPresent()) {
            Store store = optionalStore.get();
            store.setName(storeDetails.getName());
            store.setBrand(storeDetails.getBrand());
            store.setAddress(storeDetails.getAddress());
            store.setStatus(storeDetails.getStatus());
            Store updatedStore = storeRepository.save(store);
            return ResponseEntity.ok(new StoreDTO(updatedStore));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable Long id) {
        if (storeRepository.existsById(id)) {
            storeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}