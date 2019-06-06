
/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeader from './selectors';
import reducer from './reducer';

export function Header() {
  useInjectReducer({ key: 'header', reducer });

  return (
    <div>
    </div>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state,props) => {
  return createStructuredSelector({
    header: makeSelectHeader(),
});

} 

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);