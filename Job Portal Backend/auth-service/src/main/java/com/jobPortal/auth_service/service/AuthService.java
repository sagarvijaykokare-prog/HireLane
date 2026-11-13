package com.jobPortal.auth_service.service;

import com.jobPortal.auth_service.dto.UserRequestDto;
import com.jobPortal.auth_service.dto.UserResponseDto;
import com.jobPortal.auth_service.entity.Roles;
import com.jobPortal.auth_service.entity.Users;
import com.jobPortal.auth_service.repostory.RoleRepository;
import com.jobPortal.auth_service.repostory.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private UserRepository userRepository ;
    private RoleRepository roleRepository ;
    private PasswordEncoder passwordEncoder ;

    public AuthService(UserRepository userRepository , RoleRepository roleRepository , PasswordEncoder passwordEncoder){
        this.userRepository = userRepository ;
        this.roleRepository = roleRepository ;
        this.passwordEncoder = passwordEncoder ;
    }

    public UserResponseDto rejstar(UserRequestDto userRequestDto) {

        Users user  = new Users() ;
        user.setEmail(userRequestDto.getEmail());
        String password = passwordEncoder.encode(userRequestDto.getPassword()) ;
        user.setPasswordHash(password);
        user.setEnabled(true);
        Roles role = roleRepository.findByName("ROLE_USER").get();
         user.getRoles().add(role);

         userRepository.save(user);
         UserResponseDto userResponseDto = new UserResponseDto();
         userResponseDto.setMessage("User Rejstar Successfully");

        return userResponseDto;
    }


    public UserResponseDto createAdmin(UserRequestDto userRequestDto) {

        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Users user = new Users();

        user.setEmail(userRequestDto.getEmail());

        user.setPasswordHash(
                passwordEncoder.encode(userRequestDto.getPassword())
        );

        user.setEnabled(true);

        Roles role = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() ->
                        new RuntimeException("ROLE_ADMIN not found"));

        user.getRoles().add(role);

        userRepository.save(user);

        UserResponseDto response = new UserResponseDto();
        response.setMessage("Admin Created Successfully");

        return response;
    }
}
