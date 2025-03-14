// // Import dei dati
const connection = require('../data/db');

function index(req, res) {
    // Creo query 
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // versione mappata del risultato
        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // se funziona tutto
        res.json(movies);
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

// inserimento nuovo libro
function store(req, res, next) {

    const { title, author, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creiamo la query di insert
    const query = "INSERT INTO books (title, author, image, abstract) VALUES (?, ?, ?, ?)";

    connection.query(query,
        [title, author, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Libro creato con successo!",
            });
        })

}
function storeReview(req, res) {

    // id preso dai parametri
    const { id } = req.params;

    // le altre info dal body
    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    // Eseguiamo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });

}

// esporto
module.exports = { index, show, store, storeReview }