import {
  SET_CHAT_LIST,
  ADD_CHAT_TO_LIST,
  CHAT_INITIALIZED,
  SET_ACTIVE_CHAT,
  CHAT_PROCESSING_STARTED,
  CHAT_PROCESSING_FINISHED,
  ACTIVE_CHAT_INITIALIZED,
  SET_ACTIVE_CHAT_INVITATION_LIST,
  SET_ACTIVE_CHAT_MESSAGES,
  ADD_MESSAGE_TO_ACTIVE_CHAT,
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
        chats: [ ...state.activeChat.chats, chat ]
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
    case SET_ACTIVE_CHAT_INVITATION_LIST:
      return {
        ...state,
        activeChat: {
          ...action.chat,
          invitationList: action.invitationList,
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
    default:
      return state;
  }
}

export default chat;