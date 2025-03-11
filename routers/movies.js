// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

// Importiamo le funzioni del controller
const movieController = require('../controllers/moviesController');

//index//
router.get('/', movieController.index);

//show//
router.get('/:id', movieController.show);

//Esporto
module.exports = router;