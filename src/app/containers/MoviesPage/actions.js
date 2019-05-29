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

import { LOAD_MOVIES, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR } from './constants';

/**
 * Load the MOVIESitories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_MOVIES
 */
export function loadMovies() {
  return {
    type: LOAD_MOVIES,
  };
}

/**
 * Dispatched when the MOVIESitories are loaded by the request saga
 * @param  {array} MOVIES The MOVIESitory data
 * @param  {string} username The current username
 * @return {object}      An action object with a type of LOAD_MOVIES_SUCCESS passing the MOVIES
 */
export function moviesLoaded(movies) {
  return {
    type: LOAD_MOVIES_SUCCESS,
    movies,
  };
}

/**
 * Dispatched when loading the MOVIESitories fails
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOAD_MOVIES_ERROR passing the error
 */
export function moviesLoadingError(error) {
  return {
    type: LOAD_MOVIES_ERROR,
    error,
  };
}
