import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

import Loading from '../index';

describe('Loading', () => {
  const defaultProps = {
    loadable: true,
    extend: true,
    error: {
      message: '',
    },
    retry: jest.fn(),
    timedOut: 1000,
    pastDelay: true,
  };

  const renderSubject = props => render(<Loading {...defaultProps} {...props} />);

  it('should render extend loader', () => {
    const mockProps = {
      loadable: true,
      extend: true,
    };

    const { getByTestId } = renderSubject(mockProps);
    getByTestId('loading-wrapper');
  });

  it('should render loader', () => {
    const mockProps = {
      loadable: false,
      extend: false,
    };

    const { getByTestId } = renderSubject(mockProps);
    getByTestId('loader');
  });
});
