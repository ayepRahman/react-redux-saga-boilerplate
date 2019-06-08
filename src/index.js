// Needed for redux-saga es6 generator support
// import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'i18n';

import history from 'utils/history';
import configureStore from 'app/store/configureStore';

import App from 'app/containers/App';
// import LanguageProvider from 'app/containers/LanguageProvider';
import * as serviceWorker from './serviceWorker';

const store = configureStore({}, history);

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);

// TODO: migrating react-intl to react-i18next, will remove below code
// if (module.hot) {
//   console.log('module', module);
//   console.log('is hot reloading', !!module.hot);

//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'app/containers/App'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }

// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise(resolve => {
//     resolve(import('intl'));
//   })
//     .then(() =>
//       Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/de.js')]),
//     ) // eslint-disable-line prettier/prettier
//     .then(() => render(translationMessages))
//     .catch(err => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
