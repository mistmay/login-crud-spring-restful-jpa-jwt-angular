package com.advancia.bookCatalogueFinal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.advancia.bookCatalogueFinal.model.Author;
import com.advancia.bookCatalogueFinal.repository.AuthorRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthorController {
	@Autowired
	AuthorRepository authorRepository;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/author")
	public ResponseEntity<List<Author>> getAllAuthors() {
		try {
			List<Author> authors = new ArrayList<Author>();
			authorRepository.findAll().forEach(authors::add);
			return new ResponseEntity<>(authors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/author")
	public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
		try {
			Author _author = authorRepository.save(author);
			return new ResponseEntity<>(_author, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
