import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MovieContextProvider from './context/MovieContext';
import Header from './components/Header';

const { Content } = Layout;

const App = () => {
  return (
    <MovieContextProvider>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </MovieContextProvider>
  );
};

export default App;
