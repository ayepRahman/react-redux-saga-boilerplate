/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Table as RBTable } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { makeSelectSortParam } from './selectors';

import { parseSortParameterURLValue } from 'utils/sort';

import SortableTableHeader from 'app/components/SortableTableHeader';

const Table = ({ movies, location, history, sort }) => {
  const [parseSortObj, setParseSortObj] = useState();
  const { t } = useTranslation();

  console.log({ parseSortObj });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramToSort = sort || params.get('sort');
    const parseSortObj = parseSortParameterURLValue(paramToSort);
    setParseSortObj(parseSortObj);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramToSort = sort || params.get('sort');
    const parseSortObj = parseSortParameterURLValue(paramToSort);
    setParseSortObj(parseSortObj);
  }, [sort]);

  const handleSort = ({ name, order }) => {
    const params = new URLSearchParams(location.search);
    params.set('sort', `${name}.${order}`);
    history.push(`${location.pathname}?${params}`);
  };

  const renderRow = movie => {
    const finalImagePath = movie.background_path || movie.poster_path;
    const imgUrl = `https://image.tmdb.org/t/p/original/${finalImagePath}`;

    return (
      <tr key={movie.id}>
        <td>
          <img height="300px" src={imgUrl} alt={movie.title} />
        </td>
        <td>{movie.title}</td>
        <td>{movie.overview}</td>
        <td>{movie.popularity}</td>
        <td>{movie.release_date}</td>
      </tr>
    );
  };

  return (
    <RBTable responsive>
      <thead>
        <tr>
          <th name="image">{t('table-header-image', 'Image')}</th>
          <th name="title">{t('table-header-title', 'Title')}</th>
          <th name="overview">{t('table-header-overview', 'Overview')}</th>
          <SortableTableHeader
            name="popularity"
            field={parseSortObj && parseSortObj.field}
            order={parseSortObj && parseSortObj.order}
            onChange={handleSort}
          >
            {t('table-header-popularity', 'Popularity')}
          </SortableTableHeader>
          <SortableTableHeader
            name="release_date"
            field={parseSortObj && parseSortObj.field}
            order={parseSortObj && parseSortObj.order}
            onChange={handleSort}
          >
            {t('table-header-release-date', 'Date')}
          </SortableTableHeader>
        </tr>
      </thead>
      <tbody>{movies.map(movie => renderRow(movie))}</tbody>
    </RBTable>
  );
};

Table.propTypes = {
  sort: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  return createStructuredSelector({
    sort: makeSelectSortParam(),
  });
};

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect,
)(Table);
