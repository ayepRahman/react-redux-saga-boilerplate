import {
  selectMoviesStateDomain,
  makeSelectMoviesState,
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectTotalPage,
  makeSelectCurrentPageParam,
  makeSelectSortParam,
  makeSelectLanguageParam,
  makeSelectPaginationParams,
} from '../selectors';
import { getMoviesSuccess } from '../actions';

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

describe('makeSelectMoviesState', () => {
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

describe('makeSelectMovies', () => {
  const mockedResponse = [];

  const mockedState = {
    movies: {
      data: {
        results: mockedResponse,
      },
    },
  };

  it('should select movies state ', () => {
    const selectMovies = makeSelectMovies();

    expect(selectMovies(mockedState)).toEqual(mockedResponse);
  });
});

describe('makeSelectTotalPage', () => {
  const totalPage = 100;

  const mockedState = {
    movies: {
      data: {
        totalPage,
      },
    },
  };

  it('should select total page state ', () => {
    const selectTotalPage = makeSelectTotalPage();

    expect(selectTotalPage(mockedState)).toEqual(totalPage);
  });
});

describe('makeSelectCurrentPageParam', () => {
  const mockedCurrentPage = 1;

  const mockedState = {
    movies: {
      data: {
        page: mockedCurrentPage,
      },
    },
  };

  it('should select current page param state ', () => {
    const selectCurrentPageParam = makeSelectCurrentPageParam();

    expect(selectCurrentPageParam(mockedState)).toEqual(mockedCurrentPage);
  });
});

describe('makeSelectSortParam', () => {
  const mockedSort = 'asc';

  const mockedState = {
    movies: {
      data: {
        sort: mockedSort,
      },
    },
  };

  it('should select sort param state  ', () => {
    const selectSortParam = makeSelectSortParam();

    expect(selectSortParam(mockedState)).toEqual(mockedSort);
  });
});

describe('makeSelectLanguageParam', () => {
  const mockedlanguage = 'en';

  const mockedState = {
    movies: {
      data: {
        language: mockedlanguage,
      },
    },
  };

  it('should select language param state ', () => {
    const selectLanguageParam = makeSelectLanguageParam();

    expect(selectLanguageParam(mockedState)).toEqual(mockedlanguage);
  });
});

describe('makeSelectPaginationParams', () => {
  it('should select pagination params state ', () => {
    const mockedData = {
      total_pages: 1000,
      page: 5,
    };

    const mockedState = {
      movies: {
        data: mockedData,
      },
    };

    const expectedResult = {
      totalPage: 1000,
      currentPage: 5,
      prevPage: 4,
      nextPage: 6,
      isFirstPage: false,
      isLastPage: false,
    };

    const selectPaginationParams = makeSelectPaginationParams();

    expect(selectPaginationParams(mockedState)).toEqual(expectedResult);
  });

  it('should return correct value when current page is 1', () => {
    const mockedData = {
      total_pages: 1000,
      page: 1,
    };

    const mockedState = {
      movies: {
        data: mockedData,
      },
    };

    const expectedResult = {
      totalPage: 1000,
      currentPage: 1,
      prevPage: 1,
      nextPage: 2,
      isFirstPage: true,
      isLastPage: false,
    };

    const selectPaginationParams = makeSelectPaginationParams();

    expect(selectPaginationParams(mockedState)).toEqual(expectedResult);
  });

  it('should return correct value when current page is 1', () => {
    const mockedData = {
      total_pages: 1000,
      page: 1,
    };

    const mockedState = {
      movies: {
        data: mockedData,
      },
    };

    const expectedResult = {
      totalPage: 1000,
      currentPage: 1,
      prevPage: 1,
      nextPage: 2,
      isFirstPage: true,
      isLastPage: false,
    };

    const selectPaginationParams = makeSelectPaginationParams();

    expect(selectPaginationParams(mockedState)).toEqual(expectedResult);
  });

  it('should return correct value when in last page', () => {
    const mockedData = {
      total_pages: 1000,
      page: 1000,
    };

    const mockedState = {
      movies: {
        data: mockedData,
      },
    };

    const expectedResult = {
      totalPage: 1000,
      currentPage: 1000,
      prevPage: 999,
      nextPage: 1000,
      isFirstPage: false,
      isLastPage: true,
    };

    const selectPaginationParams = makeSelectPaginationParams();

    expect(selectPaginationParams(mockedState)).toEqual(expectedResult);
  });
});
