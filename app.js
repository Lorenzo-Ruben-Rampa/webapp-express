const express = require('express')
const app = express()
const port = 3000

// Registro il body-parser per "application/json"
app.use(express.json());

// Importo il file del routing
const moviesRouter = require('./routers/movies');

// Importo il middleware dell'errore 500
const errorsHandler = require("./middlewares/errorsHandler");

// Importo il middleware dell'errore 404
const notFound = require("./middlewares/notFound");

// Definisco una cartella per i file statici
app.use(express.static('public'));

// Definisco la rotta home
app.get('/', (req, res) => {
    res.send('Server del mio blog')
})

// Utilizzo la rotta movies per definire la parte iniziale delle rotte
app.use('/movies', moviesRouter)

// utilizzo middleware di gestione errore server 500
app.use(errorsHandler);

// Utilizzo middleware errore 404
app.use(notFound);

// Avvio server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
