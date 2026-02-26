import axios from 'axios';

// Determine API base URL - use window.location for relative URLs
const getApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_BASE_URL;
  if (envUrl) {
    return envUrl;
  }

  const { protocol, hostname, port } = window.location;
  const resolvedPort = (() => {
    if (port === '3000') {
      // Local dev server should talk to backend default on 5000
      return '5000';
    }
    if (port) {
      return port;
    }
    // When served without a port (production), reuse same origin
    return '';
  })();

  const portSuffix = resolvedPort ? `:${resolvedPort}` : '';
  return `${protocol}//${hostname}${portSuffix}/api`;
};

export const API_BASE_URL = getApiBaseUrl();

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
  console.log('Request:', config.method?.toUpperCase(), config.url);
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
  generateDemoData: () => apiClient.post('/applications/demo/generate'),
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
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  register: (payload: { email: string; password: string; firstName: string; lastName: string }) =>
    apiClient.post('/auth/register', payload),
  me: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};

export default apiClient;
