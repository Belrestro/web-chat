import React, { useState } from 'react';
import { connect } from 'react-redux';
import { initializeChat, setActiveChat, requestChatList, startChat } from '../../actions/chats';
import {
  initializeContacts,
  requestAllContacts,
  requestUserContactList,
  addUserToContacts,
  deleteUserFromContacts,
} from '../../actions/contacts';
import './index.css';

const Sidebar = ({
  chatState,
  contactsState,
  userState,
  markChatInitialized,
  setChatList,
  selectChat,
  markContactsInitialized,
  requestAvailableContacts,
  requestContactList,
  addToContacts,
  deleteFromContacts,
  inviteToChat,
}) => {
  const { chats: chatList } = chatState;
  const { availableContacts, userContacts } = contactsState;
  const [ searchValue, setSearchValue ] = useState('');
  const [currentTab, setTab] = useState(0);
  const [ filtered, setFiltered ] = useState([]);
  if (!chatState.initialized && !chatState.isProcessing) {
    markChatInitialized();
    setChatList();
  }
  if (!contactsState.initialized && !contactsState.isProcessing) {
    markContactsInitialized();
    requestAvailableContacts();
    requestContactList();
  }
  const filterList = (e) => {
    const list = currentTab === 0
      ? chatList
      : availableContacts;
    const { value } = e.target;
    setFiltered(list.filter(item => {
      const prop = currentTab === 0 ? item.name : item.login;
        
      return prop.toLowerCase()
        .indexOf(value.toLowerCase()) > -1;
    }))
    setSearchValue(value);
  }
  const changeTab = (tabIndex) => {
    setSearchValue('');
    setTab(tabIndex);
  };

  const hasActiveChat = (userId) => {
    const personalChat = chatList.find(chat => {
      return chat.participantIds.length === 2
        && chat.participantIds.includes(userId);
    });

    return personalChat;
  };

  const startChat = (userId) => {
    const personal = hasActiveChat(userId);

    if (personal) {
      setTab(0);
      selectChat(personal);
      return;
    }
    inviteToChat([userId, userState.user.id])
      .then((chat) => {
        setTab(0);
        selectChat(chat)
      })
  }

  const chats = searchValue ? filtered : chatList;
  const contacts = searchValue
    ? filtered
    : userContacts.map(id => availableContacts.find(c => c.id === 1));

  return (<aside className={`chat-sidebar
      ${(chatState.isProcessing || contactsState.isProcessing) ? 'disabled': ''}
    `}>
    <input className="chat-sidebar-filter"
      placeholder="Search"
      value={searchValue}
      onChange={filterList} />
    <i className="fa fa-search search-icon" aria-hidden="true"></i>
    <div className="switches">
      <button onClick={() => changeTab(0)} className={`${currentTab === 0 && 'active'}` } >Chats</button>
      <button onClick={() => changeTab(1)} className={`${currentTab === 1 && 'active'}` }>Contacts</button>
    </div>
    {
      currentTab === 0
        ? <div className="chat-list">
          {chats.map((chat) => {
            return <div onClick={() => selectChat(chat)} className="chat-item" key={chat.id}>{chat.name}</div>
          })}
        </div>
        : <div className="chat-list">
          {contacts.map(contact => {
            return <div className="chat-item" key={contact.id}>
              {contact.login}
              {
                userContacts.includes(contact.id)
                  ? <span>
                      <button onClick={() => startChat(contact.id)}>chat</button>
                      <button onClick={() => deleteFromContacts(contact.id)}>Remove</button>
                    </span>
                  : <button onClick={() => addToContacts(contact.id)}>Add</button>
              }
            </div>
          })}
        </div>
    }
    
  </aside>)
};

const mapStateToProps = (state) => ({
  chatState: state.chats,
  contactsState: state.contacts,
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    markChatInitialized: () => dispatch(initializeChat()),
    setChatList: () => dispatch(requestChatList()),
    selectChat: (chat) => dispatch(setActiveChat(chat)),
    inviteToChat: (participantIds, name) => dispatch(startChat(participantIds, name)),
    markContactsInitialized: () => dispatch(initializeContacts()),
    requestAvailableContacts: () => dispatch(requestAllContacts()),
    requestContactList: () => dispatch(requestUserContactList()),
    addToContacts: (userId) => dispatch(addUserToContacts(userId)),
    deleteFromContacts: (userId) => dispatch(deleteUserFromContacts(userId)),
  }
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);