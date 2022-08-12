package com.advancia.bookCatalogueFinal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.advancia.bookCatalogueFinal.model.Book;
import com.advancia.bookCatalogueFinal.repository.BookRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	BookRepository bookRepository;

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/book")
	public ResponseEntity<List<Book>> getAllBooks() {
		try {
			List<Book> books = new ArrayList<Book>();
			bookRepository.findAll().forEach(books::add);
			return new ResponseEntity<>(books, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/book")
	public ResponseEntity<Book> createBook(@RequestBody Book book) {
		try {
			Book _book = bookRepository.save(book);
			return new ResponseEntity<>(_book, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("isAuthenticated()")
	@PutMapping("/book/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable("id") int id, @RequestBody Book book) {
		Optional<Book> bookData = bookRepository.findById(id);
		if (bookData.isPresent()) {
			Book _book = bookData.get();
			_book.setAuthor(book.getAuthor());
			_book.setGenres(book.getGenres());
			_book.setTitle(book.getTitle());
			return new ResponseEntity<>(bookRepository.save(_book), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PreAuthorize("isAuthenticated()")
	@DeleteMapping("/book/{id}")
	public ResponseEntity<HttpStatus> deleteBook(@PathVariable("id") int id) {
		try {
			bookRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
