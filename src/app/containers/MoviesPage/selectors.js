/**
 * Moviespage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectMoviesStateDomain = state => state.movies || initialState;

const makeSelectMoviesState = () =>
  createSelector(
    selectMoviesStateDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectMoviesStateDomain,
    moviesState => moviesState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectMoviesStateDomain,
    moviesState => moviesState.error,
  );

const makeSelectMovies = () =>
  createSelector(
    selectMoviesStateDomain,
    moviesState => moviesState.data && moviesState.data.results, // movies array
  );
const makeSelectTotalPage = () =>
  createSelector(
    selectMoviesStateDomain,
    moviesState => moviesState.data && moviesState.data.totalPage, // movies array
  );
const makeSelectCurrentPage = () => {
  return createSelector(
    selectMoviesStateDomain,
    moviesState => moviesState.data && moviesState.data.page, // movies array
  );
};

const makeSelectRouteParams = props => {
  return createSelector(
    selectMoviesStateDomain,
    moviesState => {
      // due to api restriction, totalPage is hard coded
      const totalPage = 1000 || (moviesState && moviesState.data && moviesState.data.total_pages);
      const currentPage = moviesState && moviesState.data && moviesState.data.page;
      const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;
      const nextPage = currentPage < totalPage ? currentPage + 1 : totalPage;
      const isFirstPage = currentPage === 1;
      const isLastPage = currentPage === totalPage;
      return {
        totalPage,
        currentPage,
        prevPage,
        nextPage,
        isFirstPage,
        isLastPage,
      };
    },
  );
};

export {
  makeSelectMoviesState,
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectTotalPage,
  makeSelectCurrentPage,
  makeSelectRouteParams,
};
