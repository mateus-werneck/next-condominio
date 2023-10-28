import { alertEditFailed } from '@Lib/Alerts/customActions';
import axios from 'axios';

export const clientConn = axios.create({
  baseURL: `http://localhost:9015/api/`
});

clientConn.interceptors.response.use(
  (value) => Promise.resolve(value),
  () => {
    alertEditFailed();
    Promise.reject('Falha na requisição. Verifique com o administrador.');
  }
);
