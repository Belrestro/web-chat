import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  sendMessageToChat,
  requestChatMessages,
  initializeActiveChat,
  requestUsersInvitationList,
} from '../../actions/chats';
import './index.css';

const Chat = ({
  chatState, userState, sendMessage, setMessages, initializeChat,
}) => {
  const { activeChat } = chatState;

  if (activeChat && !activeChat.initialized) {
    initializeChat()
    setMessages(activeChat.id)
  };

  const [newMessage, setNewMessage] = useState('');
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

  const ref = React.createRef();
  setTimeout(() => {
    if (ref.current) {
      ref.current.scroll(0, window.scrollY + window.innerHeight);
    }
  }, 25);

  return (<main className="active-chat">
    <h3 className="name">{activeChat && activeChat.name}</h3>
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
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (chatId, text) => dispatch(sendMessageToChat(chatId, text)),
  setMessages: (chatId) => dispatch(requestChatMessages(chatId)),
  initializeChat: () => dispatch(initializeActiveChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
