const express = require('express')
const app = express()
const port = process.env.PORT

// Registro il body-parser per "application/json"
app.use(express.json());

// Importo il file del routing
const moviesRouter = require('./routers/movies');

// Importo il middleware dell'errore 500
const errorsHandler = require("./middlewares/errorsHandler");

// Importo il middleware dell'errore 404
const notFound = require("./middlewares/notFound");

// importiamo il middleware di gestione path imgs
const imagePathMiddleware = require('./middlewares/imagePath');

// Definisco una cartella per i file statici
app.use(express.static('public'));

// Definisco la rotta home
app.get('/', (req, res) => {
    res.send('Server del mio blog')
})

// registro il body-parser per "application/json"
app.use(express.json());

// registro il middleware di path imgs
app.use(imagePathMiddleware);

// definiamo la rotta home
app.get('/api', (req, res) => {
    res.send("Ciao sono la rotta Home, dell'app di recensione film");
})

// Utilizzo la rotta movies per definire la parte iniziale delle rotte
app.use('/api/movies', moviesRouter)

// utilizzo middleware di gestione errore server 500
app.use(errorsHandler);

// Utilizzo middleware errore 404
app.use(notFound);

// Avvio server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
