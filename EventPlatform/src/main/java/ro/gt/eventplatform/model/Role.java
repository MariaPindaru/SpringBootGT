package ro.gt.eventplatform.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class Role implements GrantedAuthority {
    @Id
    private String id;

    @ManyToMany
    private final List<Operation> allowedOperations = new ArrayList<>();

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return id;  // e.g. "ROLE_ADMIN", "ROLE_USER"
    }

    public Collection<Operation> getAllowedOperations() {
        return allowedOperations;
    }
}