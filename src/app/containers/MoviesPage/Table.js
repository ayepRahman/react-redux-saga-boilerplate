/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Table as RBTable } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { generateSortParameterURLValue, parseSortParameterURLValue } from 'utils/sort';

import SortableTableHeader from 'app/components/SortableTableHeader';

// import React from 'react';

// import styles from './index.module.scss';
// import classnames from 'classnames';
// import { sortOrders, toggleOrder } from 'utils/sort';

// export default function({ name, field, order, label, onChange, ...rest }) {
//   return (
//     <th {...rest}>
//       <a
//         className={classnames(styles.cursorPointer, 'font-weight-bold')}
//         onClick={e => {
//           e.preventDefault();
//           onChange({
//             field: name,
//             order: field === name ? toggleOrder(order) : order || sortOrders.ascending,
//           });
//         }}
//       >
//         {label} {field !== name && <i className="fa fa-arrows-v text-muted" />}
//         {order &&
//           field === name && (
//             <i
//               className={`fa ${order === sortOrders.descending
//                 ? 'fa-long-arrow-down'
//                 : 'fa-long-arrow-up'}`}
//             />
//           )}
//       </a>
//     </th>
//   );
// }

const Table = ({ movies, location, history }) => {
  const [sort, setSort] = useState();
  const { t } = useTranslation();

  console.log({ sort });

  useEffect(() => {
    const sortParam = getSort();
    setSort(sortParam);
  }, []);

  useEffect(() => {
    console.log('Trigger');
    const sortParam = getSort();
    setSort(sortParam);
  }, [location.search]);

  const getSort = () => {
    const query = new URLSearchParams(location.search);
    const sort = query.get('sort');

    return sort;
  };

  const handleSort = ({ name, order }) => {
    console.log(name, order);
    const params = new URLSearchParams(location.search);
    params.set('sort', `${name}.${order}`);
    history.push(`${location.pathname}?${params}`);
    setSort(order);
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
          <th name="image" order={sort} onChange={handleSort}>
            {t('table-header-image', 'Image')}
          </th>
          <th name="title" order={sort} onChange={handleSort}>
            {t('table-header-title', 'Title')}
          </th>
          <th name="overview" order={sort} onChange={handleSort}>
            {t('table-header-overview', 'Overview')}
          </th>
          <SortableTableHeader name="popularity" order={sort} onChange={handleSort}>
            {t('table-header-popularity', 'Popularity')}
          </SortableTableHeader>
          <SortableTableHeader name="release_date" order={sort} onChange={handleSort}>
            {t('table-header-release-date', 'Date')}
          </SortableTableHeader>
        </tr>
      </thead>
      <tbody>{movies.map(movie => renderRow(movie))}</tbody>
    </RBTable>
  );
};

Table.propTypes = {
  movies: PropTypes.array,
};

export default withRouter(Table);
