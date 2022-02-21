import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="movie">
        <Route path=":id" element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
