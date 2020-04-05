import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { appReducer } from './reducers'
import thunk from 'redux-thunk'
import App from './App'
import { apiEndpoint } from './config'

const store = createStore(
  appReducer,
  applyMiddleware(
    thunk.withExtraArgument(apiEndpoint),
    // createLogger()
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
