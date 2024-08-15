package com.example.demo.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<BookEntity> getAllBookings() {
        return bookRepository.findAll();
    }

    public BookEntity saveBooking(BookEntity bookEntity) {
        return bookRepository.save(bookEntity);
    }
}
