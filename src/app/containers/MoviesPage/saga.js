/**
 * Gets the repositories of the user from Github
 */

import {
  call,
  put,
  //  select,
  takeLatest,
} from 'redux-saga/effects';
import { LOAD_MOVIES } from 'app/containers/MoviesPage/constants';
import { moviesLoaded, moviesLoadingError } from 'app/containers/MoviesPage/actions';

import request from 'utils/request';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY || '6878e823788381b9f6763114fff23334';

/**
 * Github repos request/response handler
 */
export function* getMovies() {
  const requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    console.log(response);
    yield put(moviesLoaded(response));
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
