package com.example.finalproj.security;

import com.example.finalproj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService myUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    public WebSecurityConfig(UserService myUserDetailsService
            , JwtRequestFilter jwtRequestFilter) {
        this.myUserDetailsService = myUserDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);
    }

   /* @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        *//*auth.
                inMemoryAuthentication()
                .withUser("admin")
                .password("root")
                .roles("ADMIN");*//*
    }
*/

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        super.configure(auth);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .authorizeRequests().antMatchers("/user/login", "/user/add"
                , "/category/getAll", "/product/getAll", "/product/*", "/receipt/*",
                "/user/buy", "/user/update")
                .permitAll()
                /*.antMatchers("/product/add", "/product/update", "/product/delete",
                        "category/add", "/category/").hasAuthority("ADMIN")
                .antMatchers("/user/getAllReceiptsByUsername").authenticated()*/
                .and()
                /*.authorizeRequests().antMatchers("/user/login", "/user/add").permitAll()
                .and()
                .authorizeRequests().antMatchers("/admin/login").permitAll()
                .antMatchers("/category/*").authenticated().and()*/
                .exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
