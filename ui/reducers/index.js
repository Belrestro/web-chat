import { combineReducers } from 'redux';
import user from './user'
import chats from './chats'
import contacts from './contacts'

export const appReducer = combineReducers({
  user,
  chats,
  contacts,
})