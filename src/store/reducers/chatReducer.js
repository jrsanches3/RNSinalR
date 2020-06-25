import produce from 'immer';
import {ChatConsts} from '../types/types';

const initialState = {
    messages: [],
  };

  export default (state = initialState, {type, payload}) =>
  produce(state, draft => {
    switch (type) {
      case ChatConsts.NEW_MESSAGES: {
        const {author, message, isUserCreated} = payload;
        const messageItem = {
          author: author,
          message: message,
          isUserCreated: isUserCreated
        }
        draft.messages.push(messageItem)
        break;
      }
      default:
        break;
    }
  });
