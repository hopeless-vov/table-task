import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://data.jsdelivr.com/v1/package`,
})