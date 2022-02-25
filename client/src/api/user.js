import { localServer } from './default';

const userAPI = {
  login: userInfo => localServer.post('/users/login', userInfo),
  register: userInfo => localServer.post('/users/register', userInfo),
  logout: () => localServer.get('/users/logout'),
};

export default userAPI;
