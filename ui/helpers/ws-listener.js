import { wsEndpoint } from '../config';
import { addMessageToActiveChat } from '../actions/chats';
import { addUserToAvailable } from '../actions/contacts';
import { addChatToList, updateChatInList, removeChatFromList } from '../actions/chats'
import { getAuthToken } from './auth-header';

const NOTIFICATION_TYPES = {
  MESSAGE_CREATED: 'MESSAGE_CREATED',
  CHAT_CREATED: 'CHAT_CREATED',
  CHAT_UPDATED: 'CHAT_UPDATED',
  CHAT_DELETED: 'CHAT_DELETED',
  USER_CREATED: 'USER_CREATED',
};

const attachMessageListener = dispatch => ws => {
  ws.onmessage = (message) => {
    const parsed = JSON.parse(message.data)
    switch (parsed.type) {
      case NOTIFICATION_TYPES.MESSAGE_CREATED:
        return dispatch(addMessageToActiveChat(parsed.data));
      case NOTIFICATION_TYPES.USER_CREATED:
        return dispatch(addUserToAvailable(parsed.data));
      case NOTIFICATION_TYPES.CHAT_CREATED:
        return dispatch(addChatToList(parsed.data));
      case NOTIFICATION_TYPES.CHAT_UPDATED:
        return dispatch(updateChatInList(parsed.data));
      case NOTIFICATION_TYPES.CHAT_DELETED:
        return dispatch(removeChatFromList(parsed.data.id));
        return;
    }
  };
}

export const listenWsUpdates = (dispatch) => {
  try {
    const url = `${wsEndpoint}?token=${getAuthToken()}`;
    const connect = (url) => {
      const ws = new WebSocket(url);
      attachMessageListener(dispatch)(ws);

      ws.onclose = () => {
        console.log('ws disconnected, reconnecting ...');
        setTimeout(() => connect(url), 3000)
      };
    };

    connect(url);   
  } catch (err) {
    console.log(err);
    console.log('failed to connect over ws');
  }
}