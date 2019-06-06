import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { Pagination as RBPagination } from 'react-bootstrap';

const Pagination = props => {
  const { routeParams } = props;

  const onPageChange = pageNumber => {
    const params = new URLSearchParams(props.location.search);
    params.set('page', pageNumber);
    props.history.push(`${props.location.pathname}?${params}`);
  };

  return (
    <div className="py-3">
      <RBPagination>
        <RBPagination.First onClick={() => onPageChange(1)} />
        <RBPagination.Prev onClick={() => onPageChange(routeParams.prevPage)} />
        <RBPagination.Item onClick={() => onPageChange(1)}>{1}</RBPagination.Item>
        <RBPagination.Ellipsis disabled />

        {!routeParams.isFirstPage && (
          <RBPagination.Item onClick={() => onPageChange(routeParams.prevPage)}>
            {routeParams.prevPage}
          </RBPagination.Item>
        )}
        <RBPagination.Item active>{routeParams.currentPage}</RBPagination.Item>
        {!routeParams.isLastPage && (
          <RBPagination.Item onClick={() => onPageChange(routeParams.nextPage)}>
            {routeParams.nextPage}
          </RBPagination.Item>
        )}

        <RBPagination.Ellipsis disabled />
        <RBPagination.Item onClick={() => onPageChange(routeParams.totalPage)}>
          {routeParams.totalPage}
        </RBPagination.Item>
        <RBPagination.Next onClick={() => onPageChange(routeParams.nextPage)} />
        <RBPagination.Last onClick={() => onPageChange(routeParams.totalPage)} />
      </RBPagination>
    </div>
  );
};

Pagination.propTypes = {};

const mapStateToProps = (state, props) => {
  const query = new URLSearchParams(props.location.search);
  const currentPage = Number(query.get('page')) || 1;
  const totalPage = 1000;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;
  const nextPage = currentPage < totalPage ? currentPage + 1 : totalPage;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  const routeParams = {
    currentPage,
    prevPage,
    nextPage,
    totalPage,
    isFirstPage,
    isLastPage,
  };

  const structuredSelector = createStructuredSelector({});

  return {
    routeParams,
    structuredSelector,
  };
};

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Pagination);
