const router = require('express').Router();
const controller = require('./movies.controller');
const { isLoggedIn } = require('../middlewares');

router.get('/getFavoriteMovies', isLoggedIn, controller.getFavoriteMovies);
router.get('/getFavoriteStatus', isLoggedIn, controller.getFavoriteStatus);
router.post('/addFavorite', isLoggedIn, controller.addFavorite);
router.post('/removeFavorite', isLoggedIn, controller.removeFavorite);

module.exports = router;