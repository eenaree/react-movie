import { localServer, movieServer } from './default';

const movieAPI = {
  getPopularMovies: () =>
    movieServer.get(
      `/movie/popular?api_key=${process.env.API_KEY}&language=ko`
    ),
  getMovie: movieId =>
    movieServer.get(
      `/movie/${movieId}?api_key=${process.env.API_KEY}&language=ko`
    ),
  getMovieCredits: movieId =>
    movieServer.get(
      `/movie/${movieId}/credits?api_key=${process.env.API_KEY}&language=ko`
    ),
  searchMovie: query =>
    movieServer.get(
      `/search/movie?api_key=${process.env.API_KEY}&language=ko&query=${query}`
    ),
  addFavoriteMovie: movieInfo =>
    localServer.post('/movies/addFavorite', movieInfo),
  removeFavoriteMovie: movieInfo =>
    localServer.post('/movies/removeFavorite', movieInfo),
  getFavoriteMovieStatus: movieId =>
    localServer.get('/movies/getFavoriteStatus', { params: { movieId } }),
  getFavoriteMovies: () => localServer.get('/movies/getFavoriteMovies'),
  getComments: movieId =>
    localServer.get('/movies/getComments', { params: { movieId } }),
  addComment: comment => localServer.post('/movies/addComment', comment),
  removeComment: commentId =>
    localServer.post('/movies/removeComment', commentId),
  likeComment: commentId => localServer.post('/movies/likeComment', commentId),
  unlikeComment: commentId =>
    localServer.post('/movies/unlikeComment', commentId),
  getCommentLikeStatus: commentId =>
    localServer.get('/movies/getCommentLikeStatus', { params: { commentId } }),
  getCommentLikers: commentId =>
    localServer.get('/movies/getCommentLikers', { params: { commentId } }),
  addReplyComment: replyCommentInfo =>
    localServer.post('/movies/addReplyComment', replyCommentInfo),
  removeReplyComment: replyCommentId =>
    localServer.post('/movies/removeReplyComment', replyCommentId),
};

export default movieAPI;
