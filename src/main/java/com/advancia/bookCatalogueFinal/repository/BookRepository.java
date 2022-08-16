package com.advancia.bookCatalogueFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.advancia.bookCatalogueFinal.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("SELECT b FROM Book b WHERE b.user = (select u from User u where u.id = ?1)")
	List<Book> findAllByUserID(Integer user_id);
}
