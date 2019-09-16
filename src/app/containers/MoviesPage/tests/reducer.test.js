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

  it('should handle the getMoviesSuccess() action correctly', () => {
    const mockedResponse = {
      page: 1,
      total_results: 10000,
      total_pages: 500,
    };

    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.data = mockedResponse;
    });

    expect(moviesReducer(state, getMoviesSuccess(mockedResponse))).toEqual(expectedResult);
  });

  it('should handle the getMoviesError() action correctly', () => {
    const mockedError = {
      message: 'mock error message',
    };

    const expectedResult = produce(state, draft => {
      draft.error = mockedError;
      draft.loading = false;
    });

    expect(moviesReducer(state, getMoviesError(mockedError))).toEqual(expectedResult);
  });

  it('should handle the setCurrentPageParam() action correctly', () => {
    const mockedPage = 1;

    const expectedResult = produce(state, draft => {
      draft.data.page = mockedPage;
    });

    expect(moviesReducer(state, setCurrentPageParam(mockedPage))).toEqual(expectedResult);
  });

  it('should handle the setSortParam() action correctly', () => {
    const mockedSortParam = 'popularity.desc';

    const expectedResult = produce(state, draft => {
      draft.data.sort = mockedSortParam;
    });

    expect(moviesReducer(state, setSortParam(mockedSortParam))).toEqual(expectedResult);
  });

  it('should handle the setLanguageParam() action correctly', () => {
    const mockedSortParam = 'en';

    const expectedResult = produce(state, draft => {
      draft.data.language = mockedSortParam;
    });

    expect(moviesReducer(state, setLanguageParam(mockedSortParam))).toEqual(expectedResult);
  });
});
