package com.example.demo.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<BookEntity> getAllBookings() {
        return bookService.getAllBookings();
    }

    @PostMapping
    public BookEntity createBooking(@RequestBody BookEntity bookEntity) {
        return bookService.saveBooking(bookEntity);
    }
}
