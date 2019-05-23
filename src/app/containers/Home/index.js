import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
// import { useInjectSaga } from 'utils/injectSaga';

const Home = props => {
  const { number } = props;
  console.log(props);
  useInjectReducer({ key: 'Home', reducer });

  return (
    <div>
      <h1>Home</h1>
    </div>
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
