/*
 *
 * Header actions
 *
 */

import { SET_LANGUAGE } from './constants';

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language,
  };
}
