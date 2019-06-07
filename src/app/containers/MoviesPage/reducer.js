/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_START,
  GET_MOVIES_ERROR,
  SET_CURRENT_PAGE_PARAM,
  SET_SORT_PARAM,
  SET_LANGUAGE_PARAM,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  data: {
    total_pages: null,
    page: 1,
    sort: 'popularity.desc',
    language: 'en',
  },
};

/* eslint-disable default-case, no-param-reassign */
const moviesReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case GET_MOVIES_START:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_MOVIES_SUCCESS:
        draft.loading = false;
        draft.data = action.response;
        break;

      case GET_MOVIES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SET_CURRENT_PAGE_PARAM:
        draft.data.page = action.page;

        break;
      case SET_SORT_PARAM:
        draft.data.sort = action.sort;

        break;
      case SET_LANGUAGE_PARAM:
        draft.data.language = action.language;

        break;
    }
  });
};

export default moviesReducer;
