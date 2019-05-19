import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import middleware, { sagaMiddleware } from 'ui/store/middleware';

const composeEnhancers = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: how to injectReducer?

// exposing store
export const store = createStore(
  combineReducers({
    // ...reducers,
    // routing: routerReducer,
  }),
);
