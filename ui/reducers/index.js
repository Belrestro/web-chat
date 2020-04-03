import { combineReducers } from 'redux';
import user from './user'
import chats from './chats'
import contacts from './contacts'

export default combineReducers({
  user,
  chats,
  contacts,
})