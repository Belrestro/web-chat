import axios from 'axios';
import { getAuthHeader } from '../helpers/auth-header';

export const CONTACTS_PROCESSING_STARTED = 'CONTACTS_PROCESSING_STARTED';
const startContactsProcessing = () => ({ type: CONTACTS_PROCESSING_STARTED });

export const CONTACTS_PROCESSING_FINISHED = 'CONTACTS_PROCESSING_FINISHED';
const finishContactsProcessing = () => ({ type: CONTACTS_PROCESSING_FINISHED });

export const SET_CONTACTS_LIST = 'SET_CONTACTS_LIST';
export const setContactsList = (userIds) => ({
  type: SET_CONTACTS_LIST,
  userIds,  
});

export const SET_ALL_AVAILABLE_CONTACTS = 'SET_CONTACTSET_ALL_AVAILABLE_CONTACTSS_LIST';
export const setAllContacts = (contacts) => ({
  type: SET_ALL_AVAILABLE_CONTACTS,
  contacts,  
});

export const CONTACTS_INITIALIZED = 'CONTACTS_INITIALIZED';
export const initializeContacts = () => ({ type: CONTACTS_INITIALIZED });

export const ADD_CONTACT_TO_LIST = 'ADD_CONTACT_TO_LIST';
export const addContactsToList = (userId) => ({
  type: ADD_CONTACT_TO_LIST,
  userId,
})

export const REMOVE_CONTACTS_FROM_LIST = 'REMOVE_CONTACTS_FROM_LIST';
export const removeContactsFromList = (userId) => ({
  type: REMOVE_CONTACTS_FROM_LIST,
  userId,
})

export const ADD_USER_TO_AVAILABLE = 'ADD_USER_TO_AVAILABLE';
export const addUserToAvailable = (user) => ({
  type: ADD_USER_TO_AVAILABLE,
  user,
})

export const requestUserContactList = (userId) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startContactsProcessing());
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.get(`${apiEndpoint}/contacts`, requestOptions)
      .then(res => {
        dispatch(setContactsList(res.data));

        return res.data;
      })
      .finally(() => dispatch(finishContactsProcessing()));
  }
};

export const requestAllContacts = () => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startContactsProcessing());
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.get(`${apiEndpoint}/contacts/all`, requestOptions)
      .then(res => {
        dispatch(setAllContacts(res.data));

        return res.data;
      })
      .finally(() => dispatch(finishContactsProcessing()));
  }
}

export const addUserToContacts = (userId) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startContactsProcessing());
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.post(`${apiEndpoint}/contacts/${userId}`, '', requestOptions)
      .then(res => {
        dispatch(addContactsToList(userId));

        return res.data;
      })
      .finally(() => dispatch(finishContactsProcessing()));
  }
}

export const deleteUserFromContacts = (userId) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startContactsProcessing());
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.delete(`${apiEndpoint}/contacts/${userId}`, requestOptions)
      .then(res => {
        dispatch(removeContactsFromList(userId));

        return res.data;
      })
      .finally(() => dispatch(finishContactsProcessing()));
  }
}