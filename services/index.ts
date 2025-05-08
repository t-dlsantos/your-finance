import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '~/context/AuthContext';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function getAuthHeaders() {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (!token) throw new Error('Token de autenticação não encontrado');

  return {
    Authorization: `Bearer ${token}`,
  };
}

// Interceptor para renovação automática de token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) throw new Error('Refresh token não encontrado');

        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken
        });

        const newAccessToken = response.data.access;
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log('Erro ao renovar token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);