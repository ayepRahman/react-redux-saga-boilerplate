import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Container, Row, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
// import { useInjectSaga } from 'utils/injectSaga';

// #20222A

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Home = props => {
  const { number } = props;
  console.log(props);
  useInjectReducer({ key: 'Home', reducer });

  return (
    <Container className="text-white pt-5">
      <Row className="justify-content-center text-center">
        <Col className="pb-5" xs={12}>
          <h1>React Redux Saga Boilerplate</h1>
        </Col>
        <Col center xs>
          <Rotate>Rotating Imgae</Rotate>
        </Col>
      </Row>
    </Container>
  );
};

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = (state, props) => {
  return {
    number: 1,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(Home);
