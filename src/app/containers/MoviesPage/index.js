/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import { getMoviesStart, setCurrentPageParam, setSortParam, setLanguageParam } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectCurrentPageParam,
  makeSelectSortParam,
  makeSelectLanguageParam,
} from './selectors';

import Loading from 'app/components/Loading';
import Table from './Table';
import Pagination from './Pagination';

const key = 'movies';

const MoviesPage = props => {
  const { getMoviesStart, loading, error, movies, setCurrentPage, setSort, setLanguage } = props;
  const { t } = useTranslation();
  const hasMovies = movies && movies.length;
  // @dev useInjectReducer before other react hooks function
  // @dev useInjectSaga before other react hooks function
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getMoviesStart();
  }, []);

  useEffect(() => {
    const routeParams = getRouteParams();
    setCurrentPage(routeParams.currentPage || 1);
    setSort(routeParams.sort || 'popularity.desc');
    setLanguage(routeParams.language || 'en');
    getMoviesStart();
  }, [props.location.search]);

  const getRouteParams = () => {
    const query = new URLSearchParams(props.location.search);
    const routeParams = {
      currentPage: Number(query.get('page')),
      sort: query.get('sort'),
      language: query.get('lng'),
    };

    return routeParams;
  };

  return (
    <>
      {loading && <Loading extend />}
      <Container className="pt-5">
        <Row className="justify-content-center text-center">
          <Col className="pb-3" xs={12}>
            <h1>{t('movies-page-title', 'Movies')}</h1>
            <p>{t('movies-page-desc', 'You can filter by language, table sort and pagination')}</p>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          {error && !!error && <Alert variant="danger">{error}</Alert>}
          {hasMovies && <Pagination />}
          {hasMovies && <Table movies={movies} />}
          {hasMovies && <Pagination />}
        </Row>
      </Container>
    </>
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
    currentPage: makeSelectCurrentPageParam(),
    sort: makeSelectSortParam(),
    language: makeSelectLanguageParam(),
  });
};

export const mapDispatchToProps = dispatch => {
  return {
    getMoviesStart: () => {
      dispatch(getMoviesStart());
    },
    setCurrentPage: page => {
      dispatch(setCurrentPageParam(page));
    },
    setSort: sort => {
      dispatch(setSortParam(sort));
    },
    setLanguage: language => {
      dispatch(setLanguageParam(language));
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
