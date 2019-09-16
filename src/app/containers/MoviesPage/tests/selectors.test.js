import {
  selectMoviesStateDomain,
  makeSelectMoviesState,
  makeSelectLoading,
  makeSelectError,
  makeSelectTotalPage,
  // makeSelectCurrentPageParam,
  // makeSelectSortParam,
  // makeSelectLanguageParam,
  // makeSelectPaginationParams,
} from '../selectors';

import { initialState } from '../reducer';

describe('selectMoviesStateDomain', () => {
  const moviesState = {
    loading: false,
    error: false,
    data: {
      total_pages: null,
      page: 1,
      sort: 'popularity.desc',
      language: 'en',
    },
  };

  it('should select the movies state', () => {
    const mockedState = {
      movies: initialState,
    };
    expect(selectMoviesStateDomain(mockedState)).toEqual(moviesState);
  });

  it('should select the movies initialState', () => {
    const mockedState = {
      movies: '',
    };
    expect(selectMoviesStateDomain(mockedState)).toEqual(initialState);
  });
});

describe('makeSelectMovies', () => {
  const moviesSelector = makeSelectMoviesState();
  it('should select movies substate', () => {
    const moviesState = {
      loading: false,
      error: false,
      data: {
        total_pages: null,
        page: 1,
        sort: 'popularity.desc',
        language: 'en',
      },
    };

    const mockedState = {
      movies: moviesState,
    };

    expect(moviesSelector(mockedState)).toEqual(moviesState);
  });
});

describe('makeSelectLoading', () => {
  it('should select movies loading state ', () => {
    const selectLoading = makeSelectLoading();

    expect(selectLoading(initialState)).toEqual(false);
  });
});

describe('makeSelectError', () => {
  it('should select movie error state ', () => {
    const selectError = makeSelectError();

    expect(selectError(initialState)).toEqual(false);
  });
});

describe('makeSelectTotalPage', () => {
  it('should select total page state ', () => {
    const selectTotalPage = makeSelectTotalPage();

    expect(selectTotalPage(initialState)).toBeNull();
  });
});
