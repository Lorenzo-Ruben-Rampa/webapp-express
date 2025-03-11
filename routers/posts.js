// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

//index//
router.get('/posts', function (req, res) {
    res.send(`Lista dei post`);
});
//show//
router.get('/posts/:id', function (req, res) {
    res.send(`Dettagli del post` + req.params.id);
});

//Esporto
module.exports = router;