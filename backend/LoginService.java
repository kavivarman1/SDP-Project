package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginService implements UserDetailsService {

    @Autowired
    private LoginRepo logrep;

    public Loginentity findByEmail(String email) {
        return logrep.findByEmail(email);
    }

    public Loginentity saveUser(Loginentity user) {
        user.setUsername(user.getFirstname() + " " + user.getLastname());
        return logrep.save(user);
    }

    public List<Loginentity> findAllUsers() {
        return logrep.findAll();
    }

    public Loginentity findById(Long id) {
        return logrep.findById(id).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Loginentity user = logrep.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
