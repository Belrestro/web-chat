import { wsEndpoint } from '../config';
import { addMessageToActiveChat } from '../actions/chats';
import { addUserToAvailable } from '../actions/contacts';
import { addChatToList } from '../actions/chats'
import { getAuthToken } from './auth-header';

const NOTIFICATION_TYPES = {
  MESSAGE_CREATED: 'MESSAGE_CREATED',
  CHAT_CREATED: 'CHAT_CREATED',
  USER_CREATED: 'USER_CREATED',
};
export const listenWsUpdates = (dispatch) => {
  try {
    const ws = new WebSocket(`${wsEndpoint}?token=${getAuthToken()}`);
    ws.onmessage = (message) => {
      const parsed = JSON.parse(message.data)
      switch (parsed.type) {
        case NOTIFICATION_TYPES.MESSAGE_CREATED:
          return dispatch(addMessageToActiveChat(parsed.data));
        case NOTIFICATION_TYPES.USER_CREATED:
          return dispatch(addUserToAvailable(parsed.data));
        case NOTIFICATION_TYPES.CHAT_CREATED:
          return dispatch(addChatToList(parsed.data))
        default:
          return;
      }
    };
  } catch (err) {
    console.log('failed to connect over ws');
  }
}