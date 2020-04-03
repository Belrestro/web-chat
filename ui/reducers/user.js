import {
  SET_USER_TOKEN,
  SET_USER_PROFILE,
  USER_PROCESSING_STARTED,
  USER_PROCESSING_FINISHED,
  USER_INITIALIZED,
} from '../actions/user';
import { USER_TOKEN_PROP } from '../config';

const DEFAULT_STATE = {
  user: null,
  token: localStorage.getItem(USER_TOKEN_PROP),
  initialized: false,
  isProcessing: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_PROCESSING_STARTED:
      return {
        ...state,
        isProcessing: true,
      };
    case USER_PROCESSING_FINISHED:
      return {
        ...state,
        isProcessing: false,
      };
    case USER_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }
    case SET_USER_TOKEN:
      const { token } = action;
      return {
        ...state,
        token,
      };
    case SET_USER_PROFILE:
      const { user } = action;
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};
