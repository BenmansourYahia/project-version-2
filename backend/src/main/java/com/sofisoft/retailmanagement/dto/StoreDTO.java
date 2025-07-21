package com.sofisoft.retailmanagement.dto;

import com.sofisoft.retailmanagement.entity.Store;
import java.time.LocalDateTime;

public class StoreDTO {
    private Long id;
    private String name;
    private String code;
    private String brand;
    private String address;
    private String status;
    private LocalDateTime lastUpdate;
    private PerformanceDTO performance;

    public StoreDTO() {}

    public StoreDTO(Store store) {
        this.id = store.getId();
        this.name = store.getName();
        this.code = store.getCode();
        this.brand = store.getBrand();
        this.address = store.getAddress();
        this.status = store.getStatus();
        this.lastUpdate = store.getLastUpdate();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getLastUpdate() { return lastUpdate; }
    public void setLastUpdate(LocalDateTime lastUpdate) { this.lastUpdate = lastUpdate; }

    public PerformanceDTO getPerformance() { return performance; }
    public void setPerformance(PerformanceDTO performance) { this.performance = performance; }
}