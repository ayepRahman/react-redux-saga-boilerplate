import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styled from 'styled-components';

import Home from 'app/containers/Home/loadable';
import NotFoundPage from 'app/containers/NotFoundPage/loadable';

const AppWrapper = styled.div`
  height: 100%;
`;

const App = props => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
};

App.propTypes = {};

export default App;
