package com.sofisoft.retailmanagement.dto;

import com.sofisoft.retailmanagement.entity.Performance;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PerformanceDTO {
    private Long id;
    private LocalDate periode;
    private BigDecimal ca;
    private Integer tickets;
    private BigDecimal panierMoyen;
    private BigDecimal prixMoyen;
    private BigDecimal debitMoyen;
    private BigDecimal tauxTransformation;
    private Integer quantiteVendue;
    private BigDecimal objectif;
    private BigDecimal objectifAtteint;

    public PerformanceDTO() {}

    public PerformanceDTO(Performance performance) {
        this.id = performance.getId();
        this.periode = performance.getPeriode();
        this.ca = performance.getCa();
        this.tickets = performance.getTickets();
        this.panierMoyen = performance.getPanierMoyen();
        this.prixMoyen = performance.getPrixMoyen();
        this.debitMoyen = performance.getDebitMoyen();
        this.tauxTransformation = performance.getTauxTransformation();
        this.quantiteVendue = performance.getQuantiteVendue();
        this.objectif = performance.getObjectif();
        this.objectifAtteint = performance.getObjectifAtteint();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
}