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

export { makeSelectMoviesState, makeSelectLoading, makeSelectError, makeSelectMovies };
