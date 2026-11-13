package com.jobPortal.auth_service.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

public class CustomerUserDetail implements UserDetails {

    private Users user ;
    public CustomerUserDetail(Users user){
        this.user = user ;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user
                .getRoles()
                .stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getName()))
                .toList();
    }

    @Override
    public  String getPassword() {
        return user.getPasswordHash() ;
    }

    @Override
    public String  getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}
