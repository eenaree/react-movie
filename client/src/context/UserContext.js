import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: () => {},
});

const UserContextProvider = ({ children }) => {
  // state 초기값 지연 초기화
  // 첫 렌더링 때만, sessionStorage에서 사용자 정보를 가져와야 함
  // 1. sessionStorage에서 사용자 정보를 가져오는 작업을 함수로 생성 => state 초기값으로 함수 자체를 전달
  // 2. 리액트는 첫 렌더링 시, state 초기값을 계산하기 위해 전달된 함수를 호출함
  // 3. 이후 해당 state값에 대한 변화로 컴포넌트가 리렌더링 돼도 해당 함수는 호출되지 않음 => state 초기값 계산 비용 절약
  function getStoragedUser() {
    return JSON.parse(sessionStorage.getItem('user')) || null;
  }

  const [loggedUser, setLoggedUser] = useState(getStoragedUser);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
