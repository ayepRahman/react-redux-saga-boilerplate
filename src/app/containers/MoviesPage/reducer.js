/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_MOVIES_SUCCESS, LOAD_MOVIES, LOAD_MOVIES_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
const moviesReducer = (state = initialState, action) => {
  console.log('action', action);
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_MOVIES:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_MOVIES_SUCCESS:
        draft.loading = false;
        draft.data = action.data;

        break;

      case LOAD_MOVIES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });
};

export default moviesReducer;
