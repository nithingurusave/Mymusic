package com.example.Nithinproject.entity;

import jakarta.persistence.*;

@Entity
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many favorites can belong to one user-many favorites to one login.
    @ManyToOne
    @JoinColumn(name = "login_id")
    private Login login;

    // One song can be marked as favorite by many users - many favorites to one song.
    @ManyToOne
    @JoinColumn(name = "song_id")
    private Songs song;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Songs getSong() {
        return song;
    }

    public void setSong(Songs song) {
        this.song = song;
    }
}
