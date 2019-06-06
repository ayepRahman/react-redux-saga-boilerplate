import React from 'react';

import styled from 'styled-components';

const TableHeader = styled.th`
  cursor: pointer;
`;

export const sortOrders = {
  ascending: 'asc',
  descending: 'desc',
};

const SortableTableHeader = ({ key, name, order, onChange, children }) => {
  const toggleOrder = (sortOrder, defaultOrder = sortOrders.ascending) => {
    if (sortOrder === sortOrders.ascending) return sortOrders.descending;
    if (sortOrder === sortOrders.descending) return sortOrders.ascending;

    return defaultOrder;
  };

  return (
    <TableHeader
      key={key}
      onClick={event => {
        event.preventDefault();
        onChange({
          name,
          order: toggleOrder(order),
        });
      }}
    >
      {children}{' '}
      <i
        className={`fas ${
          !order
            ? 'fa-arrows-alt-v'
            : order === sortOrders.ascending
            ? 'fa-long-arrow-alt-up'
            : 'fa-long-arrow-alt-down'
        }`}
      />
    </TableHeader>
  );
};

export default SortableTableHeader;
