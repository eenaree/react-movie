import React from 'react';
import { Layout } from 'antd';
import PopularMovies from './components/PopularMovies';

const { Content } = Layout;

const App = () => {
  return (
    <Content>
      <PopularMovies />
    </Content>
  );
};

export default App;
