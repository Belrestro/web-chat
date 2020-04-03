import React from 'react';
import { connect } from 'react-redux'
import './App.css'; 
import Login from './components/login';
import Sidebar from './components/sidebar';
import Chat from './components/chat';
import Header from './components/header';
import { listenWsUpdates } from './helpers/ws-listener'
import { getUserProfile, initializeUser } from './actions/user'

const App =  ({ dispatch, user }) => {
  const loggedIn = !!user.token;
  if (!loggedIn) {
    return (<Login/>);
  }

  if (!user.initialized && !user.isProcessing) {
    dispatch(initializeUser())
    dispatch(getUserProfile()).catch(err => {})
    listenWsUpdates(dispatch);
  }

  return (
    <div className="App">
      <Header/>
      <div className="component-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { user } = state;

  return { user };
}

export default connect(mapStateToProps)(App)