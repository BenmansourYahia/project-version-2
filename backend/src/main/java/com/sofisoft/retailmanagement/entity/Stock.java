package com.sofisoft.retailmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "stocks")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(unique = true)
    private String code;

    @NotBlank
    @Size(max = 200)
    private String designation;

    @Column(nullable = false)
    private Integer quantite;

    @Column(nullable = false)
    private Integer seuil;

    @Size(max = 20)
    private String status; // disponible, stock_faible, rupture

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        lastUpdate = LocalDateTime.now();
        updateStatus();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        lastUpdate = LocalDateTime.now();
        updateStatus();
    }

    private void updateStatus() {
        if (quantite == 0) {
            status = "rupture";
        } else if (quantite <= seuil) {
            status = "stock_faible";
        } else {
            status = "disponible";
        }
    }

    // Constructors
    public Stock() {}

    public Stock(String code, String designation, Integer quantite, Integer seuil, Store store) {
        this.code = code;
        this.designation = designation;
        this.quantite = quantite;
        this.seuil = seuil;
        this.store = store;
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

    public Store getStore() { return store; }
    public void setStore(Store store) { this.store = store; }

    public LocalDateTime getLastUpdate() { return lastUpdate; }
    public void setLastUpdate(LocalDateTime lastUpdate) { this.lastUpdate = lastUpdate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}