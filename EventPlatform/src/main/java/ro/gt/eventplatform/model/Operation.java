package ro.gt.eventplatform.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class Operation implements GrantedAuthority {
    @Id
    private String id;

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return id; // e.g. "ADD_EVENT", "DELETE_EVENT"
    }
}