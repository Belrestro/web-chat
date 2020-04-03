import { USER_TOKEN_PROP } from '../config';

export const getAuthToken = () => {
  return localStorage.getItem(USER_TOKEN_PROP);
}

export const getAuthHeader = () => {
  const token = getAuthToken()

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
}