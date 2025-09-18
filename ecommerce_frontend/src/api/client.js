import axios from 'axios';

/**
 * Axios client configured for backend API.
 * Uses REACT_APP_API_BASE environment variable.
 */
const apiBase = process.env.REACT_APP_API_BASE || '/api';

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: true
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // backend may set token via login response
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Helper to extract error message safely
 */
export function getErrorMessage(err) {
  if (err?.response?.data) {
    const data = err.response.data;
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.non_field_errors) return data.non_field_errors.join(', ');
    try {
      return JSON.stringify(data);
    } catch (e) {
      return 'Unknown error';
    }
  }
  return err?.message || 'Unknown error';
}
