import {
  selectMoviesStateDomain,
  makeSelectMovies,
  // makeSelectLoading,
  // makeSelectError,
  // makeSelectTotalPage,
  // makeSelectCurrentPageParam,
  // makeSelectSortParam,
  // makeSelectLanguageParam,
  // makeSelectPaginationParams,
} from '../selectors';

describe('selectMoviesStateDomain', () => {
  it('should select the movies state', () => {
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
    expect(selectMoviesStateDomain(mockedState)).toEqual(moviesState);
  });
});

describe('makeSelectMovies', () => {
  const moviesSelector = makeSelectMovies();
  it('should select the movies', () => {
    const data = {
      results: [],
    };
    const mockedState = {
      movies: {
        data,
      },
    };
    expect(moviesSelector(mockedState)).toEqual(data.results);
  });
});
