import axios from 'axios';

export const movieServer = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const localServer = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});
