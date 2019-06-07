import produce from 'immer';
import headerReducer from '../reducer';
import { setLanguage } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('headerReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      language: 'en',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(headerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setLanguage() action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.language = 'en';
    });

    expect(headerReducer(state, setLanguage('en'))).toEqual(expectedResult);
  });
});
