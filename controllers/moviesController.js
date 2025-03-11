// // Import dei dati
const connection = require('../data/db');

//Es react api INIZIO
const express = require('express');
const app = express();

function index(req, res) {
    // Creo query 
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // se funziona tutto
        res.json(results);
    });
}

function show(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // query richiamo singolo movie tramite ID
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // prepariamo la query di richiesta
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    //chiamata tramite mysql a movies db
    connection.query(sql, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });
        // se funziona tutto
        // res.json(results[0]);
        const movie = movieResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto movie con le review ritornate
            movie.reviews = reviewResult;

            // aggiungiamo il valore path img da middleware
            movie.image = req.imagePath + movie.image;

            // ritorniamo l'oggetto completo
            res.json(movie);
        });

    });
}

// esporto
module.exports = { index, show }