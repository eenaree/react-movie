import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [loggedUser, setLoggedUser] = useState(user);

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
