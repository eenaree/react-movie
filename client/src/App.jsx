import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Main from './components/Main';
import MovieDetail from './components/MovieDetail';
import FavoriteMovies from './components/FavoriteMovies';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Authentication from './components/Authentication';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Main />} />
        <Route path="movie">
          <Route path=":id" element={<MovieDetail />} />
          <Route
            path="favorite"
            element={
              <Authentication auth={true}>
                <FavoriteMovies />
              </Authentication>
            }
          />
        </Route>
        <Route path="search" element={<Main />} />
        <Route
          path="login"
          element={
            <Authentication>
              <LoginForm />
            </Authentication>
          }
        />
        <Route
          path="register"
          element={
            <Authentication>
              <RegisterForm />
            </Authentication>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
