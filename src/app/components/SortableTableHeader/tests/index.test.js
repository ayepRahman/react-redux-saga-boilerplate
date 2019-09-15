import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SortableTableHeader, { sortOrders, toggleOrder, prefix } from '../index';

describe('Loading', () => {
  beforeEach(() => {
    cleanup();
  });

  const defaultProps = {
    order: sortOrders.ascending,
    onChange: jest.fn(),
    children: <div>Name</div>,
  };

  const renderSubject = props => render(<SortableTableHeader {...defaultProps} {...props} />);

  it('should render alt-v icon when field is not a match with name prop', () => {
    const mockProps = {
      name: 'Name',
      field: 'Test',
    };

    const { getByTestId } = renderSubject(mockProps);
    getByTestId(`${prefix}_alt-v-icon`);
  });

  it('should render alt-v icon when field is not a match with name prop', () => {
    const mockProps = {
      name: 'Name',
      field: 'Name',
    };

    const { getByTestId } = renderSubject(mockProps);
    getByTestId(`${prefix}_sorts-icons`);
  });

  it('should render alt-v icon when field is not a match with name prop', () => {
    const mockProps = {
      name: 'Name',
      field: 'Name',
    };

    const { getByTestId, rerender, container, debug } = renderSubject({
      sort: sortOrders.ascending,
      ...mockProps,
    });

    debug();

    // console.log(container);
    const sortIcon = getByTestId(`${prefix}_sorts-icons`);
    // expect(sortIcon);
  });
});
