function setImagePath(req, res, next) {
    //creo path assoluto
    req.imagePath = `${req.protocol}://${req.get('host')}/movies_cover`;
    next()
}

module.exports = setImagePath;