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

const languagesOptions = [
  { code: 'en', text: 'English' },
  { code: 'de', text: 'German' },
  { code: 'id', text: 'Indonesian' },
  { code: 'ja', text: 'Japanese' },
  { code: 'ru', text: 'Russian' },
];

export function Header(props) {
  console.log(props);
  const { history } = props;
  // @dev args for t('key', 'text')
  const { t, i18n } = useTranslation();
  // @dev useInjectReducer should always be after hooks function
  useInjectReducer({ key: 'header', reducer });

  const handleLanguage = code => {
    i18n.changeLanguage(code);
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
                <NavDropdown.Item onClick={() => handleLanguage(lng.code)}>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    header: makeSelectHeaderState(),
  });
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
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
