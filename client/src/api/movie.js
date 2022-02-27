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
};

export default movieAPI;
