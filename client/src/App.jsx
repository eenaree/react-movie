import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import UserContextProvider from './context/UserContext';
import MovieContextProvider from './context/MovieContext';
import Header from './components/Header';

const { Content } = Layout;

const App = () => {
  return (
    <UserContextProvider>
      <MovieContextProvider>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MovieContextProvider>
    </UserContextProvider>
  );
};

export default App;
