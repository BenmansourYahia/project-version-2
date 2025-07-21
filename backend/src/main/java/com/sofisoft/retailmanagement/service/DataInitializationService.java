package com.sofisoft.retailmanagement.service;

import com.sofisoft.retailmanagement.entity.Performance;
import com.sofisoft.retailmanagement.entity.Stock;
import com.sofisoft.retailmanagement.entity.Store;
import com.sofisoft.retailmanagement.entity.User;
import com.sofisoft.retailmanagement.repository.PerformanceRepository;
import com.sofisoft.retailmanagement.repository.StockRepository;
import com.sofisoft.retailmanagement.repository.StoreRepository;
import com.sofisoft.retailmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize data only if database is empty
        if (userRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create stores
        Store store1 = new Store("Magasin Central Paris", "PAR001", "Brand A", "15 Rue de la Paix, 75001 Paris", "ouvert");
        Store store2 = new Store("Magasin Lyon Centre", "LYO001", "Brand B", "45 Rue de la République, 69002 Lyon", "ouvert");
        Store store3 = new Store("Magasin Marseille Vieux Port", "MAR001", "Brand A", "12 Quai du Port, 13002 Marseille", "fermé");

        storeRepository.save(store1);
        storeRepository.save(store2);
        storeRepository.save(store3);

        // Create users
        User admin = new User("Admin", "Super", "admin@sofisoft.com", "+33 1 23 45 67 89", passwordEncoder.encode("admin"), "ADMIN");
        admin.setDescription("Administrateur système");
        Set<Store> adminStores = new HashSet<>();
        adminStores.add(store1);
        adminStores.add(store2);
        adminStores.add(store3);
        admin.setStores(adminStores);

        User manager = new User("Dupont", "Jean", "jean.dupont@store.com", "+33 1 23 45 67 89", passwordEncoder.encode("password"), "MANAGER");
        manager.setDescription("Manager passionné par la performance des équipes et l'innovation retail.");
        Set<Store> managerStores = new HashSet<>();
        managerStores.add(store1);
        managerStores.add(store2);
        manager.setStores(managerStores);

        userRepository.save(admin);
        userRepository.save(manager);

        // Create performances
        Performance perf1 = new Performance(store1, LocalDate.now(), new BigDecimal("25000"), 150, new BigDecimal("30000"));
        perf1.setPrixMoyen(new BigDecimal("45.50"));
        perf1.setDebitMoyen(new BigDecimal("12.5"));
        perf1.setTauxTransformation(new BigDecimal("68.2"));
        perf1.setQuantiteVendue(320);

        Performance perf2 = new Performance(store2, LocalDate.now(), new BigDecimal("18000"), 120, new BigDecimal("20000"));
        perf2.setPrixMoyen(new BigDecimal("42.30"));
        perf2.setDebitMoyen(new BigDecimal("10.8"));
        perf2.setTauxTransformation(new BigDecimal("65.5"));
        perf2.setQuantiteVendue(280);

        Performance perf3 = new Performance(store3, LocalDate.now(), new BigDecimal("15000"), 90, new BigDecimal("25000"));
        perf3.setPrixMoyen(new BigDecimal("38.20"));
        perf3.setDebitMoyen(new BigDecimal("8.5"));
        perf3.setTauxTransformation(new BigDecimal("55.0"));
        perf3.setQuantiteVendue(200);

        performanceRepository.save(perf1);
        performanceRepository.save(perf2);
        performanceRepository.save(perf3);

        // Create stock items
        Stock stock1 = new Stock("PRD001", "T-shirt Blanc Coton Bio", 25, 10, store1);
        Stock stock2 = new Stock("PRD002", "Jean Slim Bleu Délavé", 5, 8, store1);
        Stock stock3 = new Stock("PRD003", "Robe Été Fleurie", 0, 5, store1);
        Stock stock4 = new Stock("PRD004", "Sneakers Cuir Blanc", 15, 12, store2);
        Stock stock5 = new Stock("PRD005", "Sac à Main Cuir Noir", 3, 6, store2);

        stockRepository.save(stock1);
        stockRepository.save(stock2);
        stockRepository.save(stock3);
        stockRepository.save(stock4);
        stockRepository.save(stock5);

        System.out.println("Sample data initialized successfully!");
        System.out.println("Admin credentials: admin@sofisoft.com / admin");
        System.out.println("Manager credentials: jean.dupont@store.com / password");
    }
}