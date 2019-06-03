const credentials = {
  type: 'service_account',
  project_id: 'react-redux-saga-boilerplate',
  private_key_id: process.env.REACT_APP_GOOGLE_CREDENTIAL_PRIVATE_KEY,
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpoC4STYajQuYX\nfg0uT45lwv1/+MoZatN0P2E+3bI8nqV1zhlytZconZFR6HcOou2JUHG91CQYZOOL\n6yYhV+s58NP8wJ933tYCskq1OW7MQ+KhXW100IbzlUYglwQ2ISVVofCSFU3jm6YD\nuoBFBBegNLJQMgO8rhpKEMO4hmJ1PGWvchcPorI85JJTfh1IPm59kX2ImAsTiQ/G\nrxX8mMb6fqIE6E0frCwinzaWnYj2ZvZmfWG0OLGaYtyO5rXnTV6+GllKlIIUu3pU\nZXjAsXzPDA+6qrimmZWJ4E2WHx6Bixz31+oqRVD2stvW4eRNdDM/oYJN6dwWvf/r\nOSy8qYI7AgMBAAECggEASGnzgSjLk6MZq2nKoryf492Mbzd8v8EVKIluMHJghvSL\nWnFz976CG3q48Si2uu7fTUGkbQ/FoQxg//iRPKbV6tRfC4YIDhp5bolCz38HR/ir\nJYxHEBl9oztUxtDxoVIhKB+MHjEuIT7vbqQN4mjO1Tvp68aORdxlqLzjcUEdg0Jk\n/cu9hjkVIDdUhGVGSuZH3i3P/kVWrZZ8fSu5kOKrXome6FOMAcLctLMPmYzQcn59\n4wA5Xm/ZCV/UBI8TP71Sj3/I14djUPgR33XVlp253Bg3Kokhjolwvx5OeE+lls9z\nKpNeoO0ifnG/2QwugVoxEbhYJ3sBvUFilb3cD2S60QKBgQDh6LmjgW+yphXASkp1\nsL7rmqWyx6lqQJNl4l4cW+VaIN1gPLi3HLaHg7h4l6XPIoEyfjO3uCcJGOBSE8Za\nTmbu1WQ27q/byKBcanNrs7HTUjkOV5lI++JOmuF1Nx/ExpvWR3xaR3SOXJeess1b\n6y1cBlWiiOIOjmpcWo0BJdpdpwKBgQDAOD9iWo0BE+vkgNTV6GEW6WJIlZXYhWSn\nKxSwF6Y6fto2QN7vNmlU+5M8cas7RUa75YX++4byxljSga+mN7P/1O0ICAo/oWiE\nvxIx1HB6T8TLArJ1Nv7M50gRULjqE8D6I64Q73/luUTsfDHj43y/ujB2MrE7dXLz\nrDEanQrRTQKBgQCOMbFfhGJtPXMldN2HVLfnjpDLhjdRxNHCaIi6KvGjGFqfb7kI\nsQ8HH1bmuPVJ+rr9sEgXVNdlN35Cy2Wng//wRursVLLmkVK2uN5rpVDB5dg5+dNn\nB/y7Y2uUHx1k+2otpxNTs/Reg1OANaVjPRVw/h+6zZQUe3nhJbHpTg0zswKBgFYF\nlhAc9/dgg/PZ1+X2veR0A4D6OHoSkE3jkLmRi9mnxV38QAiLsC3Q/D5TnE7FHPef\nqwzGYckqDLwAP6xCR3KZRo6Oko+RW2X04F6edMu4ARjdFyIvv23Rn0Xoeyh+OKF4\n8EAx/mm/NOIkXmte9ggTefabjwdN82irSbpgR2QNAoGBALp+CvDYb0vk1AJbsDW/\nvBm/hR8qKUr4qSaP1vbmUueSfPfCf2Wl3lcshjmwm7mp9Cdmb4rBB7SKUDKgwhPI\nLH6gnU0a+DVyr4C7+gLCsWJPHIwuAwCZ30iFlRIsbc+WGsU2Hg7Ui1b2y6SQzTvE\nrnYYD822W516aTOnSz9AtGbm\n-----END PRIVATE KEY-----\n',
  client_email: 'ayeprahman@react-redux-saga-boilerplate.iam.gserviceaccount.com',
  client_id: process.env.REACT_APP_GOOGLE_CREDENTIAL_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/ayeprahman%40react-redux-saga-boilerplate.iam.gserviceaccount.com',
};

const test = JSON.stringify(credentials);
const stringifyJson = JSON.parse(test);
console.log(stringifyJson);

module.export = stringifyJson;
