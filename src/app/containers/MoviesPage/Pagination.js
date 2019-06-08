import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { Pagination as RBPagination } from 'react-bootstrap';

import { makeSelectPaginationParams } from './selectors';

const Pagination = props => {
  const { paginationParams } = props;

  const onPageChange = pageNumber => {
    const params = new URLSearchParams(props.location.search);
    params.set('page', pageNumber);
    props.history.push(`${props.location.pathname}?${params}`);
  };

  return (
    <div className="py-3">
      <RBPagination>
        <RBPagination.First onClick={() => onPageChange(1)} />
        <RBPagination.Prev onClick={() => onPageChange(paginationParams.prevPage)} />
        <RBPagination.Item onClick={() => onPageChange(1)}>{1}</RBPagination.Item>
        <RBPagination.Ellipsis disabled />

        {!paginationParams.isFirstPage && (
          <RBPagination.Item onClick={() => onPageChange(paginationParams.prevPage)}>
            {paginationParams.prevPage}
          </RBPagination.Item>
        )}
        <RBPagination.Item active>{paginationParams.currentPage}</RBPagination.Item>
        {!paginationParams.isLastPage && (
          <RBPagination.Item onClick={() => onPageChange(paginationParams.nextPage)}>
            {paginationParams.nextPage}
          </RBPagination.Item>
        )}

        <RBPagination.Ellipsis disabled />
        <RBPagination.Item onClick={() => onPageChange(paginationParams.totalPage)}>
          {paginationParams.totalPage}
        </RBPagination.Item>
        <RBPagination.Next onClick={() => onPageChange(paginationParams.nextPage)} />
        <RBPagination.Last onClick={() => onPageChange(paginationParams.totalPage)} />
      </RBPagination>
    </div>
  );
};

Pagination.propTypes = {
  paginationParams: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    paginationParams: makeSelectPaginationParams(props),
  });
};

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect
)(Pagination);
