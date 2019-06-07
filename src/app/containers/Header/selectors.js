import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderStateDomain = state => state.header || initialState;

const makeSelectHeaderState = () =>
  createSelector(
    selectHeaderStateDomain,
    subState => subState,
  );

const makeSelectLanguage = () =>
  createSelector(
    selectHeaderStateDomain,
    state => state.language,
  );

export { makeSelectHeaderState, makeSelectLanguage };
