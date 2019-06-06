/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import { SET_LANGUAGE } from './constants';

export const initialState = {
  language: 'en',
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LANGUAGE:
        draft.language = action.language;
        break;
    }
  });

export default headerReducer;
