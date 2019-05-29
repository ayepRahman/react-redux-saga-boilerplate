import React from 'react';
import Loadable from 'react-loadable';
import LoadingPage from 'app/components/LoadingPage';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <LoadingPage />,
});
