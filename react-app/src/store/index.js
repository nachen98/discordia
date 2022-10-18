import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import regularServerReducer from './regularserver';
import dmServerReducer from './dmserver';
import channelReducer from './channel';
import usersReducer from './users';
import messagesReducer from './messages';
const rootReducer = combineReducers({
  session,
  regularServerReducer,
  dmServerReducer,
  channelReducer,
  usersReducer,
  messagesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
