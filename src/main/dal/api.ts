import axios from 'axios';

import { DEV } from 'src/config';

export const baseURL = DEV
  ? 'http://localhost:7542/2.0/'
  : 'https://neko-back.herokuapp.com/2.0/';


export const API = axios.create({
  baseURL,
  withCredentials: true,
});
export const FileAPI = axios.create({
  baseURL: "https://dry-forest-56016.herokuapp.com",
});
