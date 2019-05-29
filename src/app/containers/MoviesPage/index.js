import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { loadMovies } from './actions';

//TODO: need to add useInjectSaga to dispatch action to saga middlewares
const key = 'Movies';

const MoviesPage = props => {
  const { getMovies } = props;
  useEffect(() => {
    // call action to get movies
    getMovies();
  }, [getMovies]);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Container className="text-white pt-5">
      <Row className="justify-content-center text-center">
        <Col className="pb-5" xs={12}>
          <h1>Movies</h1>
        </Col>
      </Row>
    </Container>
  );
};

MoviesPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = (state, props) => {
  return {
    number: 1,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => {
      dispatch(loadMovies());
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
