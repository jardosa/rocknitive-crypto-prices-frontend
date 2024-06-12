import axios from 'axios';
// eslint-disable-next-line import/named
import { StringifyOptions } from 'query-string';

export const QUERY_OPTIONS = { arrayFormat: 'index' } as StringifyOptions;

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    Accepts: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

export default Api