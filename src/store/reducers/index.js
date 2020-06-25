import {combineReducers} from 'redux';

import chatReducer from '../reducers/chatReducer'

/**
 * @returns {combineReducers}
 */
const appReducer = combineReducers({
  chat: chatReducer
});

export default appReducer;
