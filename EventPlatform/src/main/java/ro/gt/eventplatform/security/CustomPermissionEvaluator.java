package ro.gt.eventplatform.security;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ro.gt.eventplatform.service.CustomUserDetails;

import java.io.Serializable;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails user)) {
            return false;
        }

        // check if any of the user's allowed operation is the requested one
        return user.getAllowedOperations().stream()
                .anyMatch(operation -> operation.equals(permission));
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return false;
    }
}