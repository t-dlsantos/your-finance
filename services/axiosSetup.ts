import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '~/context/AuthContext';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
          throw new Error('Refresh token não encontrado');
        }

        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken
        });

        const newAccessToken = response.data.access;

        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Erro ao renovar token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
