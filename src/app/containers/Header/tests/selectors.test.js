import { selectHeaderStateDomain, makeSelectHeaderState, makeSelectLanguage } from '../selectors';

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

  it('should select the header state with initialState', () => {
    const headerState = {
      language: 'en',
    };

    const mockedState = {
      header: '',
    };

    expect(selectHeaderStateDomain(mockedState)).toEqual(headerState);
  });
});

describe('makeSelectHeaderState', () => {
  const headerStateSelector = makeSelectHeaderState();
  it('should select header state', () => {
    const headerState = {
      language: 'en',
    };
    const mockedState = {
      header: {
        language: 'en',
      },
    };

    expect(headerStateSelector(mockedState)).toEqual(headerState);
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
