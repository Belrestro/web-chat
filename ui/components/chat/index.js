import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  sendMessageToChat,
  requestChatMessages,
  initializeActiveChat,
  inviteToChat,
  getChatById,
  updateChat,
} from '../../actions/chats';
import './index.css';

const Chat = ({
  chatState,
  userState,
  contactsState,
  sendMessage,
  setMessages,
  initializeChat,
  inviteUserToChat,
  renewChat,
}) => {
  const { activeChat } = chatState;
  const { participantIds = [] } = activeChat || {};

  if (activeChat && !activeChat.initialized) {
    initializeChat()
    setMessages(activeChat.id)
  };

  const [newMessage, setNewMessage] = useState('');
  const [invitePaneVisible, setInvitePaneVisible] = useState(false);
  const [paneSearchValue, setPaneSearchValue] = useState('');

  const handleChange = fn => e => fn(e.target.value);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") trySend();
  }

  const trySend = () => {
    if (activeChat && newMessage.trim()) {
      sendMessage(activeChat.id, newMessage)
        .then(() => setNewMessage(''));
    }
  };

  const inviteUser = (userId) => {
    inviteUserToChat(activeChat.id, userId)
      .then(() => {
        participantIds.push(userId);
        setPaneSearchValue('')
        toggleInvitePane();
        renewChat(activeChat.id)
      })
  }

  const ref = React.createRef();
  setTimeout(() => {
    if (ref.current) {
      ref.current.scroll(0, window.scrollY + window.innerHeight);
    }
  }, 25);

  const toggleInvitePane = () => {
    if (invitePaneVisible) {
      setPaneSearchValue('');
    }

    setInvitePaneVisible(!invitePaneVisible);
  }

  let userInviteList = [];
  if (activeChat) {
    userInviteList = contactsState.availableContacts
      .filter(user => {
        const participatingAlready = participantIds
          && participantIds.includes(user.id);
        const isInUserContacts = contactsState.userContacts
          .includes(user.id);

        return !participatingAlready && isInUserContacts;
      })
      .filter(user => {
        if (!paneSearchValue) return true;
        return user.login.toLowerCase()
          .indexOf(paneSearchValue.toLocaleLowerCase()) > -1;
      });
  }

  const chatName = activeChat && (activeChat.name || participantIds.reduce((acc, id) => {
    const user = contactsState.availableContacts.find(u => u.id === id);
    if (user) acc.push(user.login);
    return acc;
  }, []).join(' & '));

  return (<main className={`active-chat ${chatState.isProcessing ? 'disabled' : ''}`}>
    <div className="active-chat-header">
      <h3>>> {chatName}</h3>
      {
        activeChat && <div className="pane">
          <i onClick={toggleInvitePane} className="fa fa-plus" aria-hidden="true"></i>
          {
            invitePaneVisible && <div className={`pane-list ${invitePaneVisible ? 'active' : ''}`}>
              <input type="text" placeholder="filter"
                value={paneSearchValue}
                onChange={e => setPaneSearchValue(e.target.value)}/>
              {
                userInviteList.map(user => {
                  return <div className="pane-item"
                    onClick={() => inviteUser(user.id)}>{user.login}</div>
                })
              }
            </div>
          }
        </div>
      }
    </div>
    <div className="active-chat-messages" ref={ref}>
      {activeChat 
        && activeChat.messages
        && activeChat.messages.map(message => {
          return <div key={message.id}
            className={`message
              ${message.senderId === userState.user.id ? 'righty' : 'lefty'}`}>
            <div className="bubble">{message.text}</div>
          </div>
        })}
    </div>
    <input className="send-message-input" value={newMessage}
      onChange={handleChange(setNewMessage)}
      onKeyPress={handleKeyPress}/>
    <i onClick={trySend} className="fa fa-paper-plane-o send-message-button" aria-hidden="true"></i>
  </main>)
};

const mapStateToProps = state => ({
  chatState: state.chats,
  userState: state.user,
  contactsState: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (chatId, text) => dispatch(sendMessageToChat(chatId, text)),
  setMessages: (chatId) => dispatch(requestChatMessages(chatId)),
  initializeChat: () => dispatch(initializeActiveChat()),
  inviteUserToChat: (chatId, userId) => dispatch(inviteToChat(chatId, userId)),
  renewChat: (chatId) => dispatch(getChatById(chatId)),
  updateChat: (chat) => dispatch(updateChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
