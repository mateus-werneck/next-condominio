import axios from 'axios';

export const publicAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/`
});

export const internalAPI = axios.create({
  baseURL: process.env.SYSTEM_URL
});
