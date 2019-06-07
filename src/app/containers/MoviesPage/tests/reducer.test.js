import produce from 'immer';
import moviesReducer from '../reducer';
import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesError,
  setCurrentPageParam,
  setSortParam,
  setLanguageParam,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('moviesReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      data: {
        total_pages: null,
        page: 1,
        sort: 'popularity.desc',
        language: 'en',
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(moviesReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getMoviesStart() action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
    });

    expect(moviesReducer(state, getMoviesStart())).toEqual(expectedResult);
  });
});
