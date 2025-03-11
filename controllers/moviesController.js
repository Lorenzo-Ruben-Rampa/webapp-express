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
        res.json(results);
    });
}

function show(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // query richiamo singolo movie tramite ID
    const sql = 'SELECT * FROM movies WHERE id = ?';

    //chiamata tramite mysql a movies db
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });
        res.json(results[0]);
    });
}

// esporto
module.exports = { index, show }