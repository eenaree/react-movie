const router = require('express').Router();
const controller = require('./movies.controller');
const { isLoggedIn } = require('../middlewares');

router.get('/getFavoriteMovies', isLoggedIn, controller.getFavoriteMovies);
router.get('/getFavoriteStatus', isLoggedIn, controller.getFavoriteStatus);
router.get('/getComments', controller.getComments);
router.post('/addComment', isLoggedIn, controller.addComment);
router.post('/removeComment', isLoggedIn, controller.removeComment);
router.post('/addFavorite', isLoggedIn, controller.addFavorite);
router.post('/removeFavorite', isLoggedIn, controller.removeFavorite);

module.exports = router;