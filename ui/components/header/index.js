import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setUserToken } from '../../actions/user';

const Header = ({ dispatch, userState }) => {
  const logOut = () => dispatch(setUserToken(''));
  const { user } = userState;
  return (<header className="user-status-header">
    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
    {user && user.login}
    <i className="fa fa-sign-out" aria-hidden="true" onClick={logOut}></i>
  </header>)
};

const mapStateToProps = state => ({
  userState: state.user,
})

export default connect(mapStateToProps)(Header);