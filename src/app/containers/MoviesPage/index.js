/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import { getMoviesStart } from './actions';
import { makeSelectLoading, makeSelectError, makeSelectMovies } from './selectors';

import Table from './Table';
import Pagination from './Pagination';

const key = 'movies';

const MoviesPage = props => {
  const { getMoviesStart, loading, error, movies } = props;
  const hasMovies = movies && movies.length;
  // @dev useInjectReducer before other react hooks function
  // @dev useInjectSaga before other react hooks function
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    const routeParams = getRouteParams();
    getMoviesStart({ routeParams });
  }, []);

  useEffect(() => {
    const routeParams = getRouteParams();
    getMoviesStart({ routeParams });
  }, [props.location.search]);

  const getRouteParams = () => {
    const query = new URLSearchParams(props.location.search);
    const routeParams = {
      currentPage: Number(query.get('page')) || 1,
      language: query.get('lng'),
      sort: query.get('sort'),
    };

    return routeParams;
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center text-center">
        <Col className="pb-5" xs={12}>
          <h1>Movies</h1>
        </Col>
      </Row>
      <Row className="justify-content-center text-center">
        {loading && (
          <Col className="text-center" xs={12}>
            <Spinner animation="grow" variant="dark" />
          </Col>
        )}
        {error && !!error && <Alert variant="danger">{error}</Alert>}
        {hasMovies && <Pagination />}
        {hasMovies && <Table movies={movies} />}
        {hasMovies && <Pagination />}
      </Row>
    </Container>
  );
};

MoviesPage.propTypes = {
  loading: PropTypes.bool,
  // error: PropTypes.
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    movies: makeSelectMovies(),
  });
};

const mapDispatchToProps = dispatch => {
  return {
    getMoviesStart: ({ routeParams }) => {
      dispatch(getMoviesStart({ routeParams }));
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
