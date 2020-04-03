import {
  ADD_CONTACT_TO_LIST,
  REMOVE_CONTACTS_FROM_LIST,
  ADD_USER_TO_AVAILABLE,
  CONTACTS_INITIALIZED,
  CONTACTS_PROCESSING_FINISHED,
  CONTACTS_PROCESSING_STARTED,
  SET_ALL_AVAILABLE_CONTACTS,
  SET_CONTACTS_LIST
} from '../../src/actions/contacts';

const DEFAULT_STATE = {
  initialized: false,
  isProcessing: false,
  userContacts: [],
  availableContacts: [],
}

const contacts = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CONTACTS_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }
    case CONTACTS_PROCESSING_STARTED:
      return {
        ...state,
        isProcessing: true,
      }
    case CONTACTS_PROCESSING_FINISHED:
      return {
        ...state,
        isProcessing: false,
      }
    case ADD_CONTACT_TO_LIST:
      return {
        ...state,
        userContacts: [
          ...state.userContacts,
          action.userId,
        ]
      }
    case REMOVE_CONTACTS_FROM_LIST:
      const userContacts = state
        .userContacts
        .filter(userId => userId !== action.userId);
      return {
        ...state,
        userContacts,
      }
    case ADD_USER_TO_AVAILABLE:
      return {
        ...state,
        availableContacts: [
          ...state.availableContacts,
          action.user,
        ]
      }
    case SET_ALL_AVAILABLE_CONTACTS:
      return {
        ...state,
        availableContacts: [
          ...action.contacts,
        ]
      }
    case SET_CONTACTS_LIST:
      return {
        ...state,
        userContacts: [
          ...action.userIds
        ]
      }
    default:
      return state;
  }
}

export default contacts;