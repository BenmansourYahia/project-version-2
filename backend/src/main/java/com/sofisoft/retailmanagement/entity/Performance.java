package com.sofisoft.retailmanagement.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "performances")
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(nullable = false)
    private LocalDate periode;

    @Column(precision = 10, scale = 2)
    private BigDecimal ca;

    private Integer tickets;

    @Column(name = "panier_moyen", precision = 10, scale = 2)
    private BigDecimal panierMoyen;

    @Column(name = "prix_moyen", precision = 10, scale = 2)
    private BigDecimal prixMoyen;

    @Column(name = "debit_moyen", precision = 10, scale = 2)
    private BigDecimal debitMoyen;

    @Column(name = "taux_transformation", precision = 5, scale = 2)
    private BigDecimal tauxTransformation;

    @Column(name = "quantite_vendue")
    private Integer quantiteVendue;

    @Column(precision = 10, scale = 2)
    private BigDecimal objectif;

    @Column(name = "objectif_atteint", precision = 5, scale = 2)
    private BigDecimal objectifAtteint;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        // Calculate derived values
        if (ca != null && tickets != null && tickets > 0) {
            panierMoyen = ca.divide(BigDecimal.valueOf(tickets), 2, BigDecimal.ROUND_HALF_UP);
        }
        if (objectif != null && ca != null && objectif.compareTo(BigDecimal.ZERO) > 0) {
            objectifAtteint = ca.divide(objectif, 4, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100));
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        // Recalculate derived values
        if (ca != null && tickets != null && tickets > 0) {
            panierMoyen = ca.divide(BigDecimal.valueOf(tickets), 2, BigDecimal.ROUND_HALF_UP);
        }
        if (objectif != null && ca != null && objectif.compareTo(BigDecimal.ZERO) > 0) {
            objectifAtteint = ca.divide(objectif, 4, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100));
        }
    }

    // Constructors
    public Performance() {}

    public Performance(Store store, LocalDate periode, BigDecimal ca, Integer tickets, BigDecimal objectif) {
        this.store = store;
        this.periode = periode;
        this.ca = ca;
        this.tickets = tickets;
        this.objectif = objectif;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Store getStore() { return store; }
    public void setStore(Store store) { this.store = store; }

    public LocalDate getPeriode() { return periode; }
    public void setPeriode(LocalDate periode) { this.periode = periode; }

    public BigDecimal getCa() { return ca; }
    public void setCa(BigDecimal ca) { this.ca = ca; }

    public Integer getTickets() { return tickets; }
    public void setTickets(Integer tickets) { this.tickets = tickets; }

    public BigDecimal getPanierMoyen() { return panierMoyen; }
    public void setPanierMoyen(BigDecimal panierMoyen) { this.panierMoyen = panierMoyen; }

    public BigDecimal getPrixMoyen() { return prixMoyen; }
    public void setPrixMoyen(BigDecimal prixMoyen) { this.prixMoyen = prixMoyen; }

    public BigDecimal getDebitMoyen() { return debitMoyen; }
    public void setDebitMoyen(BigDecimal debitMoyen) { this.debitMoyen = debitMoyen; }

    public BigDecimal getTauxTransformation() { return tauxTransformation; }
    public void setTauxTransformation(BigDecimal tauxTransformation) { this.tauxTransformation = tauxTransformation; }

    public Integer getQuantiteVendue() { return quantiteVendue; }
    public void setQuantiteVendue(Integer quantiteVendue) { this.quantiteVendue = quantiteVendue; }

    public BigDecimal getObjectif() { return objectif; }
    public void setObjectif(BigDecimal objectif) { this.objectif = objectif; }

    public BigDecimal getObjectifAtteint() { return objectifAtteint; }
    public void setObjectifAtteint(BigDecimal objectifAtteint) { this.objectifAtteint = objectifAtteint; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}