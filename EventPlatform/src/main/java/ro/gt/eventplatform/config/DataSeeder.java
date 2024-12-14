package ro.gt.eventplatform.config;

import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ro.gt.eventplatform.model.Operation;
import ro.gt.eventplatform.model.Role;
import ro.gt.eventplatform.model.User;
import ro.gt.eventplatform.repository.OperationRepository;
import ro.gt.eventplatform.repository.RoleRepository;
import ro.gt.eventplatform.repository.UserRepository;

import java.util.List;

@Component
public class DataSeeder {

    private final RoleRepository roleRepository;
    private final OperationRepository operationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(RoleRepository roleRepository, OperationRepository operationRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.operationRepository = operationRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void seedData() {
        seedRolesAndOperations();
        seedUsers();
    }

    public void seedRolesAndOperations() {
        // if there are no roles
        if (roleRepository.count() == 0) {
            // operations
            Operation addEvent = new Operation();
            addEvent.setId("ADD_EVENT");
            Operation updateEvent = new Operation();
            updateEvent.setId("UPDATE_EVENT");
            Operation deleteEvent = new Operation();
            deleteEvent.setId("DELETE_EVENT");
            Operation bookEvent = new Operation();
            bookEvent.setId("BOOK_EVENT");
            operationRepository.saveAll(List.of(addEvent, updateEvent, deleteEvent, bookEvent));

            // roles
            Role adminRole = new Role();
            adminRole.setId("ROLE_ADMIN");
            adminRole.getAllowedOperations().addAll(List.of(addEvent, updateEvent, deleteEvent));
            roleRepository.save(adminRole);

            Role userRole = new Role();
            userRole.setId("ROLE_USER");
            userRole.getAllowedOperations().add(bookEvent);
            roleRepository.save(userRole);

            System.out.println("Seeded roles and operations successfully.");
        } else {
            System.out.println("Roles and operations already exist. Skipping seeding.");
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.getRoles().add(roleRepository.findById("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Admin role not found")));
            userRepository.save(admin);

            // basic user
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.getRoles().add(roleRepository.findById("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("User role not found")));
            userRepository.save(user);

            System.out.println("Seeded default users successfully.");
        } else {
            System.out.println("Users already exist. Skipping seeding.");
        }
    }
}