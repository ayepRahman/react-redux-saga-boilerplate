/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import appReducer from 'app/containers/App/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    global: appReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
};
