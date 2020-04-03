import axios from 'axios';
import { USER_TOKEN_PROP } from '../config';
import { getAuthHeader } from '../helpers/auth-header'

export const USER_PROCESSING_STARTED = 'USER_PROCESSING_STARTED';
const startUserProcessing = () => ({ type: USER_PROCESSING_STARTED });

export const USER_PROCESSING_FINISHED = 'USER_PROCESSING_FINISHED';
const finishUserProcessing = () => ({ type: USER_PROCESSING_FINISHED });

export const USER_INITIALIZED = 'USER_INITIALIZED';
export const initializeUser = () => {
  return ({ type: USER_INITIALIZED })
}

export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const setUserToken = (token) => {
  localStorage.setItem(USER_TOKEN_PROP, token);
  return {
    type: SET_USER_TOKEN,
    token,
  };
}

export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  user,
})

export const registerUser = (login, password) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startUserProcessing());
    const requestOptions = {
      mode: 'no-cors',
      headers: {
        'content-type': 'application/json'
      },
    };
    return axios.post(`${apiEndpoint}/users/register`, JSON.stringify({ login, password }), requestOptions)
    .then(res => {
      const token = res.data;
      dispatch(setUserToken(token));
    })
    .finally(() => dispatch(finishUserProcessing()))
  };
};

export const loginUser = (login, password) => {
  return (dispatch, getState, apiEndpoint) => {
    dispatch(startUserProcessing());
    const requestOptions = {
      mode: 'no-cors',
      headers: {
        'content-type': 'application/json'
      },
    };

    return axios.post(`${apiEndpoint}/users/login`, JSON.stringify({ login, password }), requestOptions)
      .then(res => {
        const token = res.data;
        window.localStorage.setItem('user_token', token);
        dispatch(setUserToken(token));
      })
      .finally(() => dispatch(finishUserProcessing()))
  };
};

export const getUserProfile = () => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startUserProcessing());

    const requestOptions = {
      headers: getAuthHeader(),
    };

    return axios.get(`${apiEndpoint}/users/profile`, requestOptions)
      .then(res => res.data)
      .then(user => dispatch(setUserProfile(user)))
      .finally(() => dispatch(finishUserProcessing()))
  };
};