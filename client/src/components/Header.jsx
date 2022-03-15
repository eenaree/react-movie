import React from 'react';
import { Layout, Button, Space, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import userAPI from '../api/user';
import useAuth from '../hooks/useAuth';

const userMenuStyle = css`
  position: absolute;
  top: 0;
  right: 50px;
  display: flex;
  li {
    list-style: none;
    margin: 0 10px;
  }
`;

const Header = () => {
  const { loggedUser, setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  async function logoutUser() {
    try {
      const { data } = await userAPI.logout();
      if (data.success) {
        navigate('/');
        sessionStorage.removeItem('user');
        setLoggedUser('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onClickLogout() {
    logoutUser();
  }

  function onClickFavorite() {
    navigate('/movie/favorite');
  }

  return (
    <Layout.Header
      css={css`
        position: relative;
        display: flex;
      `}
    >
      <h1>
        <Link to="/">React Movie</Link>
      </h1>
      <Menu
        theme="dark"
        css={css`
          margin-left: 50px;
          margin-top: 10px;
        `}
      >
        <Menu.Item key="favorite" onClick={onClickFavorite}>
          즐겨찾기
        </Menu.Item>
      </Menu>
      {loggedUser ? (
        <div css={userMenuStyle}>
          <Space align="center">
            <strong
              css={css`
                color: #fff;
              `}
            >
              {loggedUser.nickname}님
            </strong>
            <Button type="link" onClick={onClickLogout}>
              로그아웃
            </Button>
          </Space>
        </div>
      ) : (
        <ul css={userMenuStyle}>
          <li>
            <Link to="/login" state={{ from: pathname + search }}>
              로그인
            </Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
        </ul>
      )}
    </Layout.Header>
  );
};

export default Header;
