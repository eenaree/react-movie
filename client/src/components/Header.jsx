import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Layout.Header>
      <h1>
        <Link to="/">React Movie</Link>
      </h1>
    </Layout.Header>
  );
};

export default Header;
