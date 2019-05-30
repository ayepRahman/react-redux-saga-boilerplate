import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getMoviesStart } from './actions';

//TODO: need to add useInjectSaga to dispatch action to saga middlewares
const key = 'movies';

const MoviesPage = props => {
  const { getMoviesStart } = props;
  // @dev useInjectReducer before other react hooks function
  // @dev useInjectSaga before other react hooks function
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    // call action to get movies
    getMoviesStart();
  }, [getMoviesStart]);

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
    getMoviesStart: () => {
      dispatch(getMoviesStart());
    },
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
