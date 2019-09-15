import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import SortableTableHeader, { sortOrders, prefix, toggleOrder } from '../index';

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

  it('should render sorts icons with ascending icon', () => {
    const mockProps = {
      name: 'Name',
      field: 'Name',
    };

    const { getByTestId } = renderSubject(mockProps);
    getByTestId(`${prefix}_sorts-icons`);
  });

  it('should render sorts icons with descending icon', () => {
    const mockProps = {
      name: 'Name',
      field: 'Name',
    };
    const { getByTestId, rerender } = renderSubject({
      order: sortOrders.ascending,
      ...mockProps,
    });

    const sortIcon = getByTestId(`${prefix}_sorts-icons`);

    expect(sortIcon).toHaveClass('fa-long-arrow-alt-up');

    rerender(
      <SortableTableHeader {...defaultProps} {...mockProps} order={sortOrders.descending} />
    );

    expect(sortIcon).toHaveClass('fa-long-arrow-alt-down');
  });

  it('should call onChange when on click ', () => {
    const { getByTestId } = renderSubject();
    const sortableTableHeader = getByTestId(`${prefix}`);

    fireEvent.click(sortableTableHeader);

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should call toggleOrder with return default order ', () => {
    const { getByTestId } = renderSubject({ order: sortOrders.ascending });
    const sortableTableHeader = getByTestId(`${prefix}`);

    fireEvent.click(sortableTableHeader);
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(toggleOrder()).toBe('asc');
  });

  it('should call toggleOrder with ascending order ', () => {
    const { getByTestId } = renderSubject({ order: sortOrders.ascending });
    const sortableTableHeader = getByTestId(`${prefix}`);

    fireEvent.click(sortableTableHeader);
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(toggleOrder(sortOrders.ascending)).toBe('desc');
  });

  it('should call toggleOrder with descending order ', () => {
    const { getByTestId } = renderSubject({ order: sortOrders.descending });
    const sortableTableHeader = getByTestId(`${prefix}`);

    fireEvent.click(sortableTableHeader);
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(toggleOrder(sortOrders.descending)).toBe('asc');
  });
});
