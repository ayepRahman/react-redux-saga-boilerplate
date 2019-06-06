import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';

import { useTranslation } from 'react-i18next';
import routeTemplates from 'utils/routeTemplates';

const Home = props => {
  const { t } = useTranslation();
  useInjectReducer({ key: 'home', reducer });

  return (
    <Container className="pt-5">
      <Row className="justify-content-center text-center">
        <Col className="pb-3" xs={8}>
          <h1>{t('home-title', 'React Redux Saga Boilerplate')} </h1>
          <p>
            {t(
              'home-desc',
              'A lightweight react redux saga boilerplate for a scalable development that focus on performance and best practices. This project uses React Hook functionality like a custom useReducer and useSaga for code-splitting',
            )}{' '}
          </p>
        </Col>
      </Row>
      <Row className="text-center justify-content-center">
        <Col xs={12}>
          <div className="pb-5">
            <img
              src="https://codemotion.ninja/wp-content/uploads/2018/09/Using-Redux-saga-with-React.jpg"
              alt=""
            />
          </div>
          <div>
            <Link to={routeTemplates.movies.root}>
              {t(
                'link',
                'See Movies Example, Open up Redux Tool to see code-splitting of useReducer and useSaga on the fly.',
              )}
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
