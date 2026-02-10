import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

console.log('API Base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request:', config.method?.toUpperCase(), config.url, 'Full URL:', config.baseURL + config.url);
  return config;
});

// Add error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const applicationService = {
  getAll: () => apiClient.get('/applications'),
  getById: (id: number) => apiClient.get(`/applications/${id}`),
  create: (data: any) => apiClient.post('/applications', data),
  update: (id: number, data: any) => apiClient.put(`/applications/${id}`, data),
  delete: (id: number) => apiClient.delete(`/applications/${id}`),
};

export const analyticsService = {
  getSummary: () => apiClient.get('/analytics/summary'),
  getWeeklyData: () => apiClient.get('/analytics/applications-per-week'),
};

export const emailService = {
  connectGmail: () => apiClient.get('/email/gmail'),
  connectOutlook: () => apiClient.get('/email/outlook'),
  syncEmails: () => apiClient.post('/email/sync'),
};

export const authService = {
  logout: () => apiClient.post('/auth/logout'),
};

export default apiClient;export default apiClient;
