package com.advancia.bookCatalogueFinal.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id")
	private Integer id;

	@Column(name = "title")
	private String title;

	@ManyToOne
	@JoinColumn(name = "author_id")
	private Author author;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany(targetEntity = Genre.class, fetch = FetchType.EAGER)
	@JoinTable(name = "book_genre", joinColumns = { @JoinColumn(name = "book_id") }, inverseJoinColumns = {
			@JoinColumn(name = "genre_id") })
	private List<Genre> genres = new ArrayList<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

}
