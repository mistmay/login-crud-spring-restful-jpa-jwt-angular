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

import com.advancia.bookCatalogueFinal.model.Genre;
import com.advancia.bookCatalogueFinal.repository.GenreRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class GenreController {
	@Autowired
	GenreRepository genreRepository;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/genre")
	public ResponseEntity<List<Genre>> getAllGenres() {
		try {
			List<Genre> genres = new ArrayList<Genre>();
			genreRepository.findAll().forEach(genres::add);
			return new ResponseEntity<>(genres, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/genre")
	public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
		try {
			Genre _genre = genreRepository.save(genre);
			return new ResponseEntity<>(_genre, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
