import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'app/containers/HomePage/loadable';
import NotFoundPage from 'app/containers/NotFoundPage/loadable';
import MoviesPage from 'app/containers/MoviesPage/loadable';

import routeTemplates from 'utils/routeTemplates';
import styled from 'styled-components';

import GlobalStyle from 'style';

const AppWrapper = styled.div`
  height: 100%;
`;

const App = props => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path={routeTemplates.root} component={HomePage} />
        <Route exact path={routeTemplates.movies.root} component={MoviesPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
};

App.propTypes = {};

export default App;
