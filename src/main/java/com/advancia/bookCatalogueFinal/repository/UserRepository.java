package com.advancia.bookCatalogueFinal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.advancia.bookCatalogueFinal.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);

	Optional<User> findByUsernameAndPassword(String username, String password);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
