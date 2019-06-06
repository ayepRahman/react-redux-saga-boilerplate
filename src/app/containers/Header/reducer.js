/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION_START, DEFAULT_ACTION_SUCCESS, DEFAULT_ACTION_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  language: 'en',
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION_START:
        draft.loading = true;
        draft.error = false;
        break;

      case DEFAULT_ACTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.response;
        break;

      case DEFAULT_ACTION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default headerReducer;
