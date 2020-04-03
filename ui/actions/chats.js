import axios from 'axios';
import { getAuthHeader } from '../helpers/auth-header';

export const CHAT_PROCESSING_STARTED = 'CHAT_PROCESSING_STARTED';
const startChatProcessing = () => ({ type: CHAT_PROCESSING_STARTED });

export const CHAT_PROCESSING_FINISHED = 'CHAT_PROCESSING_FINISHED';
const finishChatProcessing = () => ({ type: CHAT_PROCESSING_FINISHED });

export const SET_CHAT_LIST = 'SET_CHAT_LIST';
export const setChatList = (chats) => ({
  type: SET_CHAT_LIST,
  chats,  
});

export const CHAT_INITIALIZED = 'CHAT_INITIALIZED';
export const initializeChat = () => ({ type: CHAT_INITIALIZED });

export const ADD_CHAT_TO_LIST = 'ADD_CHAT_TO_LIST';
export const addChatToList = (chat) => ({
  type: ADD_CHAT_TO_LIST,
  chat,
})

export const requestChatList = () => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startChatProcessing());
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.get(`${apiEndpoint}/chats`, requestOptions)
      .then(res => {
        dispatch(setChatList(res.data));

        return res.data;
      })
      .finally(() => dispatch(finishChatProcessing()));
  }
};

export const startChat = (participantIds, name) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startChatProcessing());
    const requestOptions = {
      headers: {
        ...getAuthHeader(),
        'content-type': 'application/json',
      },
    };

    const payload = JSON.stringify({ participantIds, name });

    return axios.post(`${apiEndpoint}/chats`, payload, requestOptions)
      .then(res => {
        dispatch(setActiveChat(res.data));

        return res.data;
      })
      .finally(() => dispatch(finishChatProcessing()));
  }
}

export const SET_ACTIVE_CHAT_INVITATION_LIST = 'SET_ACTIVE_CHAT_INVITATION_LIST';
export const setActiveChatInvitationList = (invitationList) => ({
  type: SET_ACTIVE_CHAT_INVITATION_LIST,
  invitationList,
});

export const requestUsersInvitationList = (chatId) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startChatProcessing());
    const requestOptions = {
      headers: getAuthHeader()
    };

    return axios.get(`${apiEndpoint}/chats/${chatId}/invite`, requestOptions)
      .then(res => {

        return res.data;
      })
      .finally(() => dispatch(finishChatProcessing()));
  }
}

export const inviteToChat = (chatId, participantIds) => {
  return (dispatch, _, apiEndpoint) => {
    dispatch(startChatProcessing());
    const requestOptions = {
      headers: {
        ...getAuthHeader(),
        'content-type': 'application/json',
      },
    };

    const payload = JSON.stringify({ participantIds });

    return axios.post(`${apiEndpoint}/chats/${chatId}/invite`, payload, requestOptions)
      .then(res => res.data)
      .finally(() => dispatch(finishChatProcessing()));
  }
}

export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const setActiveChat = (chat) => ({
  type: SET_ACTIVE_CHAT,
  chat,
})

export const ACTIVE_CHAT_INITIALIZED = 'ACTIVE_CHAT_INITIALIZED';
export const initializeActiveChat = () => ({ type: ACTIVE_CHAT_INITIALIZED });

export const SET_ACTIVE_CHAT_MESSAGES = 'SET_ACTIVE_CHAT_MESSAGES';
export const setActiveChatMessage = (messages) => ({ type: SET_ACTIVE_CHAT_MESSAGES, messages });

export const ADD_MESSAGE_TO_ACTIVE_CHAT = 'ADD_MESSAGE_TO_ACTIVE_CHAT';
export const addMessageToActiveChat = (message) => ({ type: ADD_MESSAGE_TO_ACTIVE_CHAT, message });

export const requestChatMessages = (chatId) => {
  return (dispatch, _, apiEndpoint) => {
    const requestOptions = {
      headers: getAuthHeader(),
    };
    return axios.get(`${apiEndpoint}/chats/${chatId}/messages`, requestOptions)
      .then(res => {
        dispatch(setActiveChatMessage(res.data));

        return res.data;
      });
  }
};

export const sendMessageToChat = (chatId, text) => {
  return (dispatch, _, apiEndpoint) => {
    const requestOptions = {
      headers: {
        ...getAuthHeader(),
        'content-type': 'application/json',
      },
    };
    const payload = JSON.stringify({ text });
    return axios.post(`${apiEndpoint}/chats/${chatId}/messages`, payload, requestOptions);
  }
};
