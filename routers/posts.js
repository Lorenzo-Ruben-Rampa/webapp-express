// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

// Importiamo le funzioni del controller
const postController = require('../controllers/postsController');

//index//
router.get('/', postsController.index);

//show//
router.get('/:id', postsController.show);

//Esporto
module.exports = router;