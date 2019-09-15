import React from 'react';

import styled from 'styled-components';

const TableHeader = styled.th`
  cursor: pointer;
`;

export const sortOrders = {
  ascending: 'asc',
  descending: 'desc',
};

export const toggleOrder = (sortOrder, defaultOrder = sortOrders.ascending) => {
  if (sortOrder === sortOrders.ascending) return sortOrders.descending;
  if (sortOrder === sortOrders.descending) return sortOrders.ascending;
  return defaultOrder;
};

export const prefix = 'sortable-table-header';

/**
 *
 * @param {string || number} key - key
 * @param {string} name - the name of the table header
 * @param {string} field - a parse string that is return from the parseUrl
 * @param {string} order -  asc || desc
 * @param {onChange} - a function that return name and order
 * @param {children} - react children
 */
const SortableTableHeader = ({ key, name, field, order, onChange, children }) => {
  return (
    <TableHeader
      data-testid={`${prefix}`}
      key={key}
      onClick={event => {
        event.preventDefault();
        onChange({
          name,
          order: toggleOrder(order),
        });
      }}
    >
      <div className="d-flex">
        {children}
        <div className="pl-2">
          {field !== name && (
            <i data-testid={`${prefix}_alt-v-icon`} className={`fas fa-arrows-alt-v text-muted`} />
          )}
          {field === name && (
            <i
              data-testid={`${prefix}_sorts-icons`}
              className={`fas ${
                order === sortOrders.ascending ? 'fa-long-arrow-alt-up' : 'fa-long-arrow-alt-down'
              }`}
            />
          )}
        </div>
      </div>
    </TableHeader>
  );
};

export default SortableTableHeader;
