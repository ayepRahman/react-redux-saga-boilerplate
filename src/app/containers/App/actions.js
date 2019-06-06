/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_USER_SUCCESS, GET_USER_START, GET_USER_ERROR } from './constants';

/**
 * Get user, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_USER_START
 */
export function getUserStart() {
  return {
    type: GET_USER_START,
  };
}

/**
 * Dispatched when the user are loaded by the request saga
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

/**
 * Dispatched when loading the user fails
 * @param  {object} error The error
 * @return {object}       An action object with a type of GET_USER_ERROR passing the error
 */
export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}
