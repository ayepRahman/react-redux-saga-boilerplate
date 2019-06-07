/**
 *
 * Tests for Header
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

// import 'jest-dom/extend-expect'; // add some helpful assertions
// import React from 'react';
// import { render } from '@testing-library/react';
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';

// import configureStore from '../../../store/configureStore';
import { setLanguage } from '../actions';
import { mapDispatchToProps } from '../index.js';

describe('mapDispatchToProps', () => {
  describe('setLanguage', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.setLanguage).toBeDefined();
    });

    it('should dispatch setLanguage when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const language = 'en';
      result.setLanguage(language);
      expect(dispatch).toHaveBeenCalledWith(setLanguage(language));
    });
  });
});
