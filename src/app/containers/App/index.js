import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Home from 'app/containers/Home';
import NotFoundPage from 'app/containers/NotFoundPage';

const App = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

App.propTypes = {};

export default App;
