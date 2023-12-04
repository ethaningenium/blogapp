import axios from 'axios';
import { getToken } from './TokenSetnGet';

export const getAuth = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  const { data } = await axios.post('/api/auth/getall', {
    token: token,
  });
  return {
    userEmail: data.Email,
    userName: data.fullName,
  };
};
