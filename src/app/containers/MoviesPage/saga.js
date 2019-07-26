import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_MOVIES_START } from 'app/containers/MoviesPage/constants';
import { getMoviesSuccess, getMoviesError } from 'app/containers/MoviesPage/actions';
import {
  makeSelectCurrentPageParam,
  makeSelectSortParam,
} from 'app/containers/MoviesPage/selectors';
import { makeSelectLanguage } from 'app/containers/Header/selectors';
import request from 'utils/request';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY || '6878e823788381b9f6763114fff23334';

export function* getMovies() {
  const currentPage = yield select(makeSelectCurrentPageParam());
  const language = yield select(makeSelectLanguage());
  const sort = yield select(makeSelectSortParam());

  try {
    const response = yield call(request, {
      method: 'get',
      endpoint: '3/discover/movie',
      config: {
        params: {
          api_key: API_KEY,
          include_adult: true,
          language,
          sort_by: sort,
          page: currentPage,
        },
      },
    });

    yield put(getMoviesSuccess(response.data));
  } catch (err) {
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
