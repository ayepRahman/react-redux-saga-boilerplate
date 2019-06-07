import { setLanguage } from '../actions';
import { SET_LANGUAGE } from '../constants';

describe('Header actions', () => {
  describe('setLanguage action', () => {
    it('has a type of SET_LANGUAGE', () => {
      const expected = {
        type: SET_LANGUAGE,
      };
      expect(setLanguage()).toEqual(expected);
    });
  });
});
