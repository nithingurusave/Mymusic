package com.example.Nithinproject.service;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Nithinproject.entity.Favorites;
import com.example.Nithinproject.entity.Login;
import com.example.Nithinproject.entity.Songs;
import com.example.Nithinproject.repository.FavoritesRepo;
import com.example.Nithinproject.repository.LoginRepo;
import com.example.Nithinproject.repository.SongRepository;

import jakarta.transaction.Transactional;



@Service
@Transactional
public class FavoritesService {

    @Autowired
    private FavoritesRepo favoritesRepo;

    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private SongRepository songRepo;

    // Add a favorite song for a user
    public String addToFavorites(Long loginId, Long songId) {
        Login login = loginRepo.findById(loginId).orElse(null);
        Songs song = songRepo.findById(songId).orElse(null);

        if (login == null || song == null) {
            return "Login or Song not found";
        }

        Favorites existing = favoritesRepo.findByLogin_IdAndSong_Id(loginId, songId);
        if (existing != null) {
            return "Already in favorites";
        }

        Favorites favorite = new Favorites();
        favorite.setLogin(login);
        favorite.setSong(song);
//        favorite.setLoginId(loginId);
//        favorite.setSongId(songId);

        favoritesRepo.save(favorite);
        return "Added to favorites";
    }

    // Get list of Songs marked as favorites by loginId
    public List<Songs> getFavorites(Long loginId) {
        List<Favorites> favorites = favoritesRepo.findByLogin_Id(loginId);
        return favorites.stream()
                .map(Favorites::getSong)
                .collect(Collectors.toList());
    }

    // Remove a song from user's favorites
    public String removeFromFavorites(Long loginId, Long songId) {
        Favorites existing = favoritesRepo.findByLogin_IdAndSong_Id(loginId, songId);
        if (existing != null) {
            favoritesRepo.deleteByLogin_IdAndSong_Id(loginId, songId);
            return "Removed from favorites";
        }
        return "Favorite not found";
    }

    // Optional: Add an empty favorite entry for login (song details can be null)
    public String createEmptyFavorite(Long loginId) {
        Login login = loginRepo.findById(loginId).orElse(null);
        if (login != null) {
            Favorites fav = new Favorites();
            fav.setLogin(login);
//            fav.setLoginId(loginId);
            favoritesRepo.save(fav);
            return "Empty favorite created";
        }
        return "Login not found";
    }
}
