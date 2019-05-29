/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MOVIES } from 'containers/Movies/constants';
import { moviesLoaded, moviesLoadingError } from 'containers/Movies/actions';

import request from 'utils/request';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY || '6878e823788381b9f6763114fff23334';

/**
 * Github repos request/response handler
 */
export function* getMovies() {
  const requestURL = `https://api.github.com/users/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const movies = yield call(request, requestURL);
    yield put(moviesLoaded(movies));
  } catch (err) {
    yield put(moviesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_MOVIES actions and calls getMovies when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_MOVIES, getMovies);
}
