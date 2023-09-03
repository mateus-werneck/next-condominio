import axios from 'axios';

export const publicAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/`
});

publicAPI.interceptors.response.use(
  (value) => Promise.resolve(value),
  (error) => {
    throw new Error('Falha na requisição.', { cause: error });
  }
);
