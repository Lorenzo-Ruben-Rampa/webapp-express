// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

//index//
app.get('/posts', function (req, res) {
    res.send(`Lista dei post`);
});
//show//
app.get('/posts/:id', function (req, res) {
    res.send(`Dettagli del post` + req.params.id);
});
