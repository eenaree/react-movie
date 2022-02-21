import axiosInstance from './default';

const movieAPI = {
  getPopularMovies: () =>
    axiosInstance.get(
      `/movie/popular?api_key=${process.env.API_KEY}&language=ko`
    ),
  getMovie: movieId =>
    axiosInstance.get(
      `/movie/${movieId}?api_key=${process.env.API_KEY}&language=ko`
    ),
  getMovieCredits: movieId =>
    axiosInstance.get(
      `/movie/${movieId}/credits?api_key=${process.env.API_KEY}&language=ko`
    ),
};

export default movieAPI;
