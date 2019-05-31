import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import routeTemplates from 'utils/routeTemplates';

import ReactLogo from 'resources/images/react-logo.png';
import ReduxLogo from 'resources/images/redux-logo.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 5s linear infinite;
`;

const Home = props => {
  useInjectReducer({ key: 'home', reducer });

  return (
    <Container className="pt-5">
      <Row className="justify-content-center text-center">
        <Col className="pb-5" xs={12}>
          <h1>React Redux Saga Boilerplate</h1>
        </Col>
      </Row>
      <Row className="text-center justify-content-center pt-5">
        <Col xs={6}>
          <div className="pb-5">
            <Rotate>
              <img src={ReactLogo} alt="react-logo" height="150" />
            </Rotate>
            <Rotate>
              <img src={ReduxLogo} alt="react-logo" height="150" />
            </Rotate>
          </div>
          <div>
            <Link to={routeTemplates.movies.root}>
              <FormattedMessage {...messages.link} />
            </Link>
          </div>
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
