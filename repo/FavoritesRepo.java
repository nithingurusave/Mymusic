package com.example.Nithinproject.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Nithinproject.entity.Favorites;

public interface FavoritesRepo extends JpaRepository<Favorites, Long> {

    // Now using nested properties from Login and Songs entity references
    List<Favorites> findByLogin_Id(Long loginId);
    
    Favorites findByLogin_IdAndSong_Id(Long loginId, Long songId);
    
    void deleteByLogin_IdAndSong_Id(Long loginId, Long songId);
}
