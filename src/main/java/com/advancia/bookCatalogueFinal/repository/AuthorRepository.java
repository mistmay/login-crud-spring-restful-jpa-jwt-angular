package com.advancia.bookCatalogueFinal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.advancia.bookCatalogueFinal.model.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {

}
