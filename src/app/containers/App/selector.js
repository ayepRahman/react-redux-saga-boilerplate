/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const makeSelectGlobalState = state => state.global || initialState;

const makeSelectRouterState = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    makeSelectGlobalState,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    makeSelectGlobalState,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    makeSelectGlobalState,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    makeSelectGlobalState,
    globalState => globalState.userData.repositories,
  );

export {
  makeSelectGlobalState,
  makeSelectRouterState,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
