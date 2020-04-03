import {
  SET_CHAT_LIST,
  ADD_CHAT_TO_LIST,
  CHAT_INITIALIZED,
  SET_ACTIVE_CHAT,
  CHAT_PROCESSING_STARTED,
  CHAT_PROCESSING_FINISHED,
  ACTIVE_CHAT_INITIALIZED,
  SET_ACTIVE_CHAT_MESSAGES,
  ADD_MESSAGE_TO_ACTIVE_CHAT,
  REMOVE_CHAT_FROM_LIST,
  UPDATE_CHAT_IN_LIST,
} from '../actions/chats'

const DEFAULT_STATE = {
  chats: [],
  activeChat: null,
  initialized: false,
  isProcessing: false,
};

const chat = (state = DEFAULT_STATE , action) => {
  switch (action.type) {
    case CHAT_PROCESSING_STARTED:
      return {
        ...state,
        isProcessing: true,
      };
    case CHAT_PROCESSING_FINISHED:
      return {
        ...state,
        isProcessing: false,
      };
    case CHAT_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case ACTIVE_CHAT_INITIALIZED:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          initialized: true,
        }
      }
    case SET_CHAT_LIST:
      return {
        ...state,
        chats: action.chats,
      }
    case ADD_CHAT_TO_LIST:
      const { chat } = action;
      return {
        ...state,
        chats: [ ...state.chats, chat ]
      }
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: {
          ...action.chat,
          messages: [],
          invitationList: [],
        }
      }
    case SET_ACTIVE_CHAT_MESSAGES:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: [...action.messages],
        }
      }
    case ADD_MESSAGE_TO_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: [...state.activeChat.messages, action.message],
        }
      }
    case UPDATE_CHAT_IN_LIST:
      const updated = action.chat;
      const activeChat = state.activeChat
        && state.activeChat.id === updated.id
          ? { ...state.activeChat, ...updated }
          : state.activeChat;
      return {
        ...state,
        chats: state.chats.map(chat => {
          if (chat.id === updated.id) {
            Object.assign(chat, updated)
          }
          return chat;
        }),
        activeChat,
      }
    case REMOVE_CHAT_FROM_LIST:
      const { chatId } = action;
      const newActiveChat = state.activeChat
        && state.activeChat.id === chatId
          ? null
          : state.activeChat;
      return {
        ...state,
        chats: state.chats.filter(chat => {
          return chat.id !== chatId;
        }),
        activeChat: newActiveChat,
      }
    default:
      return state;
  }
}

export default chat;