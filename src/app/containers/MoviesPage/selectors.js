/**
 * Moviespage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectMoviesState = state => state.movies || initialState;

const makeSelectLoading = () =>
  createSelector(
    makeSelectMoviesState,
    moviesState => moviesState.loading,
  );

const makeSelectError = () =>
  createSelector(
    makeSelectMoviesState,
    moviesState => moviesState.error,
  );

const makeSelectMovies = () =>
  createSelector(
    makeSelectMoviesState,
    moviesState => moviesState.data && moviesState.data.results, // movies array
  );

export { makeSelectMoviesState, makeSelectLoading, makeSelectError, makeSelectMovies };
