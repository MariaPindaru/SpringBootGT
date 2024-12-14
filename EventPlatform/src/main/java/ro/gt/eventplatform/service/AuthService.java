package ro.gt.eventplatform.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.gt.eventplatform.controller.DTO.LoginResultDTO;
import ro.gt.eventplatform.repository.UserRepository;
import ro.gt.eventplatform.security.JwtTokenProvider;

import java.util.Collection;
import java.util.Set;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public LoginResultDTO login(String username, String password) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            // Get the authorities (roles) of the authenticated user
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String token =  jwtTokenProvider.createToken(username);
            String role = "user";
            for(GrantedAuthority authority :userDetails.getAuthorities()){
                if (authority.getAuthority().contains("ADMIN")){
                    role = "admin";
                }
            }
            return new LoginResultDTO(token, role);

        } catch (AuthenticationException e) {
            throw new Exception("Invalid username/password supplied");
        }
    }

}
