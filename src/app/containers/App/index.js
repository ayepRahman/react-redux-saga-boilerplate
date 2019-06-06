/**
 * App
 *
 * !important to import component or container using Loadable
 * for asynchronous loading of component/container
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'app/containers/Header/Loadable';

import HomePage from 'app/containers/HomePage/Loadable';
import NotFoundPage from 'app/containers/NotFoundPage/Loadable';
import MoviesPage from 'app/containers/MoviesPage/Loadable';

import routeTemplates from 'utils/routeTemplates';
import styled from 'styled-components';

// @dev select global style we set in /style directory
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
