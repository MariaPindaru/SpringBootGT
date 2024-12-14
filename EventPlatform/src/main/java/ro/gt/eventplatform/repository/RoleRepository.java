package ro.gt.eventplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.gt.eventplatform.model.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
}