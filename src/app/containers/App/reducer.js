/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { GET_USER_SUCCESS, GET_USER_START, GET_USER_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  user: {
    token: false,
    username: 'John Doe',
    role: 'Admin',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_START:
        draft.loading = true;
        break;

      case GET_USER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.user = action.user;
        break;

      case GET_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default appReducer;
