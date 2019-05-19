import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export default middleware;
