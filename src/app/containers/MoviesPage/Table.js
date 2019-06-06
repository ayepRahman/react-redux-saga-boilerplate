import React from 'react';
import PropTypes from 'prop-types';

import { Table as RBTable } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

const Table = ({ movies }) => {
  const { t } = useTranslation();

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
          <th>{t('table-header-image', 'Image')}</th>
          <th>{t('table-header-title', 'Title')}</th>
          <th>{t('table-header-overview', 'Overview')}</th>
          <th>{t('table-header-popularity', 'Popularity')}</th>
          <th>{t('table-header-release-date', 'Date')}</th>
        </tr>
      </thead>
      <tbody>{movies.map(movie => renderRow(movie))}</tbody>
    </RBTable>
  );
};

Table.propTypes = {
  movies: PropTypes.array,
};

export default Table;
