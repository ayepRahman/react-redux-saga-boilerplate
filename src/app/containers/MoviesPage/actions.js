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

import { GET_MOVIES_START, GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from './constants';

/**
 * Load the MOVIESitories, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_MOVIES
 */
export function getMoviesStart({ routeParams }) {
  return {
    type: GET_MOVIES_START,
    routeParams,
  };
}

/**
 * Dispatched when the MOVIESitories are loaded by the request saga
 * @param  {array} MOVIES The MOVIESitory data
 * @param  {string} username The current username
 * @return {object}      An action object with a type of GET_MOVIES_SUCCESS passing the MOVIES
 */
export function getMoviesSuccess(response) {
  return {
    type: GET_MOVIES_SUCCESS,
    response,
  };
}

/**
 * Dispatched when loading the MOVIESitories fails
 * @param  {object} error The error
 * @return {object}       An action object with a type of GET_MOVIES_ERROR passing the error
 */
export function getMoviesError(error) {
  return {
    type: GET_MOVIES_ERROR,
    error,
  };
}
