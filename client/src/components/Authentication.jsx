import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Authentication = ({ children, auth = false }) => {
  // props로 페이지에 해당하는 컴포넌트, 해당 페이지가 로그인 여부가 필요한지(boolean)를 받음
  // 1. 로그인이 필요한 페이지인지 체크
  // 2. 현재 로그인 여부 체크
  const { loggedUser } = useAuth();
  const { pathname, search } = useLocation();
  const from = pathname + search;

  if (!auth) {
    // 로그인이 필요없는 페이지 but, 로그인된 상태라면 진입해서는 안되는 페이지 ex) 회원가입, 로그인 폼
    // 로그인 유저가 있다면 => 메인 페이지로 강제 이동
    // 없다면 => 해당 페이지 보여주기
    if (loggedUser) {
      return <Navigate to="/" replace={true} />;
    }
    return children;
  }

  // 로그인이 필요한 페이지
  // 로그인 유저가 있다면 => 해당 페이지 보여주기
  // 없다면 => 로그인 페이지로 이동
  if (!loggedUser) {
    return <Navigate to="/login" state={{ from }} replace={true} />;
  }
  return children;
};

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
  auth: PropTypes.bool,
};

export default Authentication;
