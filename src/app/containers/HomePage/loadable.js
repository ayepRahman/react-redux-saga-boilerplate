import React from 'react';
import Loadable from 'react-loadable';
import LoadingPage from 'app/components/Loading';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <LoadingPage fullHeight />,
  delay: 500, // Avoiding Flash Of Loading Component
  timeout: 10000, // Timing out when the loader is taking too long
});
