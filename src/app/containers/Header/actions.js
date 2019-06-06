/*
 *
 * Header actions
 *
 */

import { DEFAULT_ACTION_START, DEFAULT_ACTION_SUCCESS, DEFAULT_ACTION_ERROR } from './constants';

export function defaultActionStart() {
  return {
    type: DEFAULT_ACTION_START,
  };
}

export function defaultActionSuccess(response) {
  return {
    type: DEFAULT_ACTION_SUCCESS,
    response,
  };
}

export function defaultActionError(error) {
  return {
    type: DEFAULT_ACTION_ERROR,
    error,
  };
}
