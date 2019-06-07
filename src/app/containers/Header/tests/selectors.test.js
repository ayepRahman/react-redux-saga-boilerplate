import { selectHeaderStateDomain, makeSelectLanguage } from '../selectors';

describe('selectHeaderStateDomain', () => {
  it('should select the header state', () => {
    const headerState = {
      language: 'en',
    };
    const mockedState = {
      header: headerState,
    };
    expect(selectHeaderStateDomain(mockedState)).toEqual(headerState);
  });
});

describe('makeSelectLanguage', () => {
  const languageSelector = makeSelectLanguage();
  it('should select the username', () => {
    const language = 'en';
    const mockedState = {
      header: {
        language,
      },
    };
    expect(languageSelector(mockedState)).toEqual(language);
  });
});
