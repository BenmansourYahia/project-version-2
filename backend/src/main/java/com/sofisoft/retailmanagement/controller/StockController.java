package com.sofisoft.retailmanagement.controller;

import com.sofisoft.retailmanagement.dto.StockDTO;
import com.sofisoft.retailmanagement.entity.Stock;
import com.sofisoft.retailmanagement.entity.Store;
import com.sofisoft.retailmanagement.repository.StockRepository;
import com.sofisoft.retailmanagement.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StoreRepository storeRepository;

    @GetMapping
    public ResponseEntity<List<StockDTO>> getAllStocks() {
        List<Stock> stocks = stockRepository.findAll();
        List<StockDTO> stockDTOs = stocks.stream()
                .map(StockDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stockDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockDTO> getStockById(@PathVariable Long id) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (stock.isPresent()) {
            return ResponseEntity.ok(new StockDTO(stock.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<StockDTO>> getStocksByStore(@PathVariable Long storeId) {
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isPresent()) {
            List<Stock> stocks = stockRepository.findByStore(store.get());
            List<StockDTO> stockDTOs = stocks.stream()
                    .map(StockDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(stockDTOs);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<StockDTO>> getStocksByStatus(@PathVariable String status) {
        List<Stock> stocks = stockRepository.findByStatus(status);
        List<StockDTO> stockDTOs = stocks.stream()
                .map(StockDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stockDTOs);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<StockDTO>> getLowStockItems() {
        List<Stock> stocks = stockRepository.findLowStockItems();
        List<StockDTO> stockDTOs = stocks.stream()
                .map(StockDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stockDTOs);
    }

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<StockDTO>> getOutOfStockItems() {
        List<Stock> stocks = stockRepository.findOutOfStockItems();
        List<StockDTO> stockDTOs = stocks.stream()
                .map(StockDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stockDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<StockDTO>> searchStocks(@RequestParam String query) {
        List<Stock> stocks = stockRepository.findByDesignationContainingOrCodeContaining(query, query);
        List<StockDTO> stockDTOs = stocks.stream()
                .map(StockDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(stockDTOs);
    }

    @PostMapping
    public ResponseEntity<StockDTO> createStock(@RequestBody Stock stock) {
        Stock savedStock = stockRepository.save(stock);
        return ResponseEntity.ok(new StockDTO(savedStock));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockDTO> updateStock(@PathVariable Long id, @RequestBody Stock stockDetails) {
        Optional<Stock> optionalStock = stockRepository.findById(id);
        if (optionalStock.isPresent()) {
            Stock stock = optionalStock.get();
            stock.setDesignation(stockDetails.getDesignation());
            stock.setQuantite(stockDetails.getQuantite());
            stock.setSeuil(stockDetails.getSeuil());
            Stock updatedStock = stockRepository.save(stock);
            return ResponseEntity.ok(new StockDTO(updatedStock));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStock(@PathVariable Long id) {
        if (stockRepository.existsById(id)) {
            stockRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}