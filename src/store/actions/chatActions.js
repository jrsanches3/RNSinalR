import {ChatConsts} from '../types/types'


export const newMessage = (user, msg, isUserCreated) => async dispatch => {
    dispatch({
      type: ChatConsts.NEW_MESSAGES,
      payload: {
        author: user,
        message: msg,
        isUserCreated: isUserCreated
      },
    });
}