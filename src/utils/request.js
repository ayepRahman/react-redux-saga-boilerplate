import axios from 'axios';
import * as yup from 'yup';

const prefix = 'path: utils/request.js';
const baseUrl = process.env.REACT_APP_BASE_URL || 'https://api.themoviedb.org/';

/**
 * A way to provide descriptive errors
 * in development but generic errors in production.
 */

const checkRequest = async ({ method, url, config }) => {
  let schema = yup.object().shape({
    method: yup
      .mixed()
      .oneOf(['get', 'post', 'put', 'patch', 'delete'])
      .required(),
    url: yup
      .string()
      .url()
      .required(),
    config: yup.object(),
  });

  try {
    await schema.isValid({
      method: method,
      url: url,
      config: config,
    });
  } catch (error) {
    console.error(`${prefix}: ${error.message}`);
  }
};

const buildFullUrl = endpoint => {
  const lastChar = baseUrl.substr(-1);
  const validBaseUrl = lastChar === '/' ? baseUrl : `${baseUrl}/`;
  return `${validBaseUrl}${endpoint}`;
};

/**
 * @dev - request handle Promise based HTTP client for the browser and node.js
 * @param {string} method - oneOf ['get', 'post', 'put', 'patch', 'delete']
 * @param {string} endpoint - e.g 'app/register'
 * @param {object} config - an object
 * https://github.com/axios/axios#request-config
 */
export default function request({ method, endpoint, config }) {
  const url = buildFullUrl(endpoint);
  checkRequest({ method, url, config });

  return axios.request({
    method,
    url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...config,
  });
}
