package com.jobPortal.auth_service.service;

import com.jobPortal.auth_service.entity.CustomerUserDetail;
import com.jobPortal.auth_service.entity.Users;
import com.jobPortal.auth_service.repostory.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    private final UserRepository userRepository ;

    public  CustomerUserDetailService(UserRepository userRepository){
        this.userRepository = userRepository ;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       Users  user = userRepository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("User is not Found ")) ;
        return new CustomerUserDetail(user);
    }
}
