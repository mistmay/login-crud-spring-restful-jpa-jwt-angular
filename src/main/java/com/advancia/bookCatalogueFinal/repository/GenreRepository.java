package com.advancia.bookCatalogueFinal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.advancia.bookCatalogueFinal.model.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
