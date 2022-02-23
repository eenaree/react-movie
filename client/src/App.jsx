import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MovieContextProvider from './context/MovieContext';

const { Content } = Layout;

const App = () => {
  return (
    <MovieContextProvider>
      <Content>
        <Outlet />
      </Content>
    </MovieContextProvider>
  );
};

export default App;
