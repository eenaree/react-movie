import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieDetail from './components/MovieDetail';
import SearchMovie from './components/SearchMovie';
import Main from './components/Main';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FavoriteMovies from './components/FavoriteMovies';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="movie">
          <Route path=":id" element={<MovieDetail />} />
          <Route path="favorite" element={<FavoriteMovies />} />
        </Route>
        <Route path="search" element={<SearchMovie />} />
      </Route>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
