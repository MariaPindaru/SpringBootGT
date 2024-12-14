package ro.gt.eventplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.gt.eventplatform.model.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}