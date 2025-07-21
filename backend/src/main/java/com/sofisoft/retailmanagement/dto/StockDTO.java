package com.sofisoft.retailmanagement.dto;

import com.sofisoft.retailmanagement.entity.Stock;
import java.time.LocalDateTime;

public class StockDTO {
    private Long id;
    private String code;
    private String designation;
    private Integer quantite;
    private Integer seuil;
    private String status;
    private LocalDateTime lastUpdate;
    private String storeName;
    private String storeCode;

    public StockDTO() {}

    public StockDTO(Stock stock) {
        this.id = stock.getId();
        this.code = stock.getCode();
        this.designation = stock.getDesignation();
        this.quantite = stock.getQuantite();
        this.seuil = stock.getSeuil();
        this.status = stock.getStatus();
        this.lastUpdate = stock.getLastUpdate();
        if (stock.getStore() != null) {
            this.storeName = stock.getStore().getName();
            this.storeCode = stock.getStore().getCode();
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public Integer getSeuil() { return seuil; }
    public void setSeuil(Integer seuil) { this.seuil = seuil; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getLastUpdate() { return lastUpdate; }
    public void setLastUpdate(LocalDateTime lastUpdate) { this.lastUpdate = lastUpdate; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }

    public String getStoreCode() { return storeCode; }
    public void setStoreCode(String storeCode) { this.storeCode = storeCode; }
}