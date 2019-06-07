import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesError,
  setCurrentPageParam,
  setSortParam,
  setLanguageParam,
} from '../actions';
import {
  GET_MOVIES_START,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  SET_CURRENT_PAGE_PARAM,
  SET_SORT_PARAM,
  SET_LANGUAGE_PARAM,
} from '../constants';

describe('Movie Page actions', () => {
  describe('getMoviesStart action', () => {
    it('has a type of GET_MOVIES_START', () => {
      const expected = {
        type: GET_MOVIES_START,
      };
      expect(getMoviesStart()).toEqual(expected);
    });
  });

  describe('getMoviesSuccess action', () => {
    it('has a type of GET_MOVIES_SUCCESS and response', () => {
      const response = {};
      const expected = {
        type: GET_MOVIES_SUCCESS,
        response,
      };
      expect(getMoviesSuccess(response)).toEqual(expected);
    });
  });

  describe('getMoviesError action', () => {
    it('has a type of GET_MOVIES_ERROR and error', () => {
      const error = {};
      const expected = {
        type: GET_MOVIES_ERROR,
        error,
      };
      expect(getMoviesError(error)).toEqual(expected);
    });
  });

  describe('setCurrentPageParam action', () => {
    it('has a type of SET_CURRENT_PAGE_PARAM and page', () => {
      const page = 1;
      const expected = {
        type: SET_CURRENT_PAGE_PARAM,
        page,
      };
      expect(setCurrentPageParam(page)).toEqual(expected);
    });
  });

  describe('setSortParam action', () => {
    it('has a type of SET_SORT_PARAM and sort', () => {
      const sort = 'popularity.desc';
      const expected = {
        type: SET_SORT_PARAM,
        sort,
      };
      expect(setSortParam(sort)).toEqual(expected);
    });
  });

  describe('setLanguageParam action', () => {
    it('has a type of SET_LANGUAGE_PARAM and error', () => {
      const language = 'en';
      const expected = {
        type: SET_LANGUAGE_PARAM,
        language,
      };
      expect(setLanguageParam(language)).toEqual(expected);
    });
  });
});
