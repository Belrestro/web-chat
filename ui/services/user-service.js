import { getAuthHeader, storeToken } from '../helpers/auth-header';
import { apiUrl } from '../config';

const authorize = async (login, password) => {
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeader(),
  }

  let token;

  token = await fetch(`${apiUrl}/users/login`, requestOptions)
    .then(res => res.json());

  return token;
}

const getProfile = async () => {
  
};