package com.advancia.bookCatalogueFinal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.advancia.bookCatalogueFinal.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

}
