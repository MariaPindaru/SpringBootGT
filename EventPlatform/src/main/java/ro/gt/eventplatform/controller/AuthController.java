package ro.gt.eventplatform.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.gt.eventplatform.security.JwtTokenProvider;
import ro.gt.eventplatform.service.AuthService;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final AuthService authService;

    public AuthController(JwtTokenProvider jwtTokenProvider, AuthService authService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader != null && authorizationHeader.startsWith("Basic ")) {
                // Extract the base64-encoded username:password
                String base64Credentials = authorizationHeader.substring("Basic ".length());
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));

                // Extract username and password
                String[] values = credentials.split(":", 2);
                String username = values[0];
                String password = values[1];

                String token = authService.login(username, password);

                Map<String, String> response = new HashMap<>();
                response.put("token", token);

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
//        try{
//            String token = authService.login(loginDto.getUsername(), loginDto.getPassword());
//
//            return new ResponseEntity<>(token, HttpStatus.OK);
//
//        }catch (Exception exception){
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//    }
}