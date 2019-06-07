/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectHeaderState } from './selectors';
import reducer from './reducer';
import routeTemplates from 'utils/routeTemplates';

import { setLanguage } from './actions';

const languagesOptions = [
  { code: 'en', text: 'English' },
  { code: 'de', text: 'German' },
  { code: 'id', text: 'Indonesian' },
  { code: 'ja', text: 'Japanese' },
  { code: 'ru', text: 'Russian' },
];

export function Header(props) {
  const { history, setLanguage } = props;
  const { t, i18n } = useTranslation();
  useInjectReducer({ key: 'header', reducer });

  const handleLanguage = language => {
    const searchParams = new URLSearchParams(props.location.search);
    searchParams.set('lng', language);
    props.history.push(`${props.location.pathname}?${searchParams}`);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand role="button" onClick={() => history.push(routeTemplates.root)}>
          React-Redux-Saga-Boilerplate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => history.push(routeTemplates.root)}>
              {t('navbar-link-home', 'Home')}
            </Nav.Link>
            <Nav.Link onClick={() => history.push(routeTemplates.movies.root)}>
              {t('navbar-link-movies', 'Movies')}
            </Nav.Link>
            <NavDropdown
              alignRight
              title={t('navbar-link-dropdown', 'Language')}
              id="basic-nav-dropdown"
            >
              {languagesOptions.map(lng => (
                <NavDropdown.Item key={lng.code} onClick={() => handleLanguage(lng.code)}>
                  {t(`navbar-link-${lng.code}`, `${lng.text}`)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  setLanguage: PropTypes.func,
};

export const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    header: makeSelectHeaderState(),
  });
};

export const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => dispatch(setLanguage(language)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Header);
