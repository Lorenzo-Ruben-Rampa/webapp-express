function setImagePath(req, res, next) {
    //creo path assoluto
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies_cover/`;
    next()
}

module.exports = setImagePath;