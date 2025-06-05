package com.example.Nithinproject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Nithinproject.entity.Songs;
import com.example.Nithinproject.service.FavoritesService;

@RestController
@CrossOrigin("*")
@RequestMapping("/music")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @PostMapping("/addfavorites/{loginId}/{songId}")
    public String addToFavorites(@PathVariable("loginId") Long loginId, @PathVariable("songId") Long songId) {
        return favoritesService.addToFavorites(loginId, songId);
    }

    @GetMapping("/getfavorites/{loginId}")
    public List<Songs> getFavorites(@PathVariable("loginId") Long loginId) {
        return favoritesService.getFavorites(loginId);
    }

    @DeleteMapping("/deletefavorites/{loginId}/{songId}")
    public String removeFromFavorites(@PathVariable("loginId") Long loginId, @PathVariable("songId") Long songId) {
        return favoritesService.removeFromFavorites(loginId, songId);
    }

    @PostMapping("/createemptyfavorite/{loginId}")
    public String createEmptyFavorite(@PathVariable("loginId") Long loginId) {
        return favoritesService.createEmptyFavorite(loginId);
    }
}
