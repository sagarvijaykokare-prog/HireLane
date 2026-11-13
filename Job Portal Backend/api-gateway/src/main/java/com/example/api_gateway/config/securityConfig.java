package com.example.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;

@Configuration
public class securityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,    CorsConfigurationSource corsConfigurationSource)
            throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public authentication endpoints
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/user/rejstar"
                        ).permitAll()

                        // USER and ADMIN can view jobs
                        .requestMatchers(HttpMethod.GET, "/api/application/**")
                        .hasAnyAuthority("ROLE_USER" , "ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/profile/**")
                                .hasAnyAuthority("ROLE_USER")



                                .requestMatchers(HttpMethod.POST, "/api/admin/**")
                        .hasAuthority("ROLE_ADMIN")

                        // Only ADMIN can perform other job operations

                                .requestMatchers(HttpMethod.GET, "/api/job/**")
                                .hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")

                        // Other endpoints require authentication
                        .anyRequest().authenticated()
                )

                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(
                                        jwtAuthenticationConverter()
                                )
                        )
                );

        return http.build();
    }

    @Bean
    public Converter<Jwt, ? extends AbstractAuthenticationToken>
    jwtAuthenticationConverter() {

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {

            List<String> authorities =
                    jwt.getClaimAsStringList("authorities");

            if (authorities == null) {
                return List.of();
            }

//            return authorities.stream()
//                    .map(SimpleGrantedAuthority::new)
//                    .toList();
            return authorities.stream()
                    .map(authority ->
                            (org.springframework.security.core.GrantedAuthority)
                                    new SimpleGrantedAuthority(authority))
                    .toList();
        });

        return converter;
    }
}
