import React, { useState } from 'react'
import { connect } from 'react-redux'
import './index.css'

import { loginUser, registerUser } from '../../actions/user'

const Login = ({ user, signIn, signUp }) => {
  const [currentTab, changeTab] = useState(1);
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const cleanup = () => {
    changeLogin('');
    changePassword('');
  };
  const cleanupMessages = () => {
    setErrorMessage('')
    setSuccessMessage('')
  };
  const signUpUser = () => {
    cleanupMessages();
    signUp(login, password)
      .then(() => {
        cleanup();
        changeTab(0);
        setSuccessMessage('User created, now you can sign in');
      })
      .catch(err => {
        console.log(err.response)
        if (err.response && err.response.status === 409) {
          setErrorMessage('User with this name already exists')
        } else {
          setErrorMessage('server error');
        }
      })
  };

  const signInUser = () => {
    cleanupMessages()
    signIn(login, password)
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          setErrorMessage('Invalid login or password')
        } else {
          setErrorMessage('server error');
        }
      })
  }
  const handleInput = (fn) => (e) => fn(e.target.value);

  return (<div className="auth-form-container">
    <h3>Web chat application</h3>

    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <input type="text" value={login} disabled={user.isProcessing} onChange={handleInput(changeLogin)}/>
      <input type="password" value={password} disabled={user.isProcessing} onChange={handleInput(changePassword)}/>
      <div className="auth-form-success">{successMessage}</div>
      <div className="auth-form-error">{errorMessage}</div>
      <div className="auth-form-declaimer">    
          {
            currentTab === 0
              ? <p>Sign in to continue, don't have account <b onClick={changeTab.bind(null, 1)}>sign up</b></p>
              : <p>Already registered, use your account <b onClick={changeTab.bind(null, 0)}>sign in</b></p>
          }
      </div>
      {
        currentTab === 0
          ? <button disabled={user.isProcessing || !login || !password} onClick={signInUser}>Sign in</button>
          : <button disabled={user.isProcessing || !login || !password} onClick={signUpUser}>Sign up</button>
      }
    </form>
  </div>)
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (login, password) => dispatch(loginUser(login, password)),
    signUp: (login, password) => dispatch(registerUser(login, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);