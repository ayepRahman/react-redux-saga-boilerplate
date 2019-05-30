import {
  call,
  put,
  //  select,
  takeLatest,
} from 'redux-saga/effects';
import { GET_MOVIES_START } from 'app/containers/MoviesPage/constants';
import { getMoviesSuccess, getMoviesError } from 'app/containers/MoviesPage/actions';

import request from 'utils/request';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY || '6878e823788381b9f6763114fff23334';

export function* getMovies() {
  const requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  try {
    const response = yield call(request, requestURL);
    console.log(response);
    // passing response to our action to update our reducer
    yield put(getMoviesSuccess(response));
  } catch (err) {
    // passing error to our action to update our reducer
    yield put(getMoviesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* moviesSaga() {
  // Watches for GET_MOVIES_START actions and calls getMovies when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_MOVIES_START, getMovies);
}
