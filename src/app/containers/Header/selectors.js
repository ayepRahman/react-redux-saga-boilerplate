import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const makeSelectHeaderState = state => (state && state.header) || initialState;

/**
 * Other specific selectors
 */

export { makeSelectHeaderState };
