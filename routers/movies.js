// importiamo express e usiamo il routing
const express = require('express')
const router = express.Router();

// importiamo il controller
const upload = require('../middlewares/multer');

// Importiamo le funzioni del controller
const movieController = require('../controllers/moviesController');

//index//
router.get('/', movieController.index);

//show//
router.get('/:id', movieController.show);

// store review
router.post('/:id/reviews', movieController.storeReview);

// store movie
router.post('/', upload.single('image'), movieController.store);


//Esporto
module.exports = router;