package com.example.demo.home;

import com.example.demo.home.HomeEntity;
import com.example.demo.home.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService {

    @Autowired
    private HomeRepository homeRepository;

    public List<HomeEntity> getAllHomes() {
        return homeRepository.findAll();
    }


}
