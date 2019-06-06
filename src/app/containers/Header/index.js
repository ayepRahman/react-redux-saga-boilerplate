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

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectHeaderState } from './selectors';
import reducer from './reducer';
import routeTemplates from 'utils/routeTemplates';

export function Header() {
  // @dev args for t('key', 'text')
  const { t, i18n } = useTranslation();
  // @dev useInjectReducer should always be after hooks function
  useInjectReducer({ key: 'header', reducer });

  return (
    <>
      {/* <h1>{t('title', 'Header')}</h1> */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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

export default compose(withConnect)(Header);
