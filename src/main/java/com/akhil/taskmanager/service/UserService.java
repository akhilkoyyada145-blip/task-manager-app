package com.akhil.taskmanager.service;

import com.akhil.taskmanager.model.User;
import java.util.Optional;

public interface UserService {

    User registerUser(User user);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);
}