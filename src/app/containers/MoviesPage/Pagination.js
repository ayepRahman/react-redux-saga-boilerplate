import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { Pagination as RBPagination } from 'react-boostrap';

const Pagination = props => {
  return (
    <RBPagination>
      <RBPagination.First />
      <RBPagination.Prev />
      <RBPagination.Item>{1}</RBPagination.Item>
      <RBPagination.Ellipsis />

      <RBPagination.Item>{10}</RBPagination.Item>
      <RBPagination.Item>{11}</RBPagination.Item>
      <RBPagination.Item active>{12}</RBPagination.Item>
      <RBPagination.Item>{13}</RBPagination.Item>
      <RBPagination.Item disabled>{14}</RBPagination.Item>

      <RBPagination.Ellipsis />
      <RBPagination.Item>{20}</RBPagination.Item>
      <RBPagination.Next />
      <RBPagination.Last />
    </RBPagination>
  );
};

Pagination.propTypes = {};

const mapStateToProps = (state, props) => {
  const query = new URLSearchParams(props.location.search);
  const routeParams = {
    currentPage: Number(query.get('page')) || 1,
    // sort: parseSortParameterURLValue(query.get('sort')),
  };

  return createStructuredSelector({
    routeParams,
  });
};

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Pagination);
