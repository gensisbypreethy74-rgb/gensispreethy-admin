import axios from 'axios';

// Create an Axios instance for frontend API calls to the external backend
const rawBackendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_BASE = rawBackendUrl
  ? rawBackendUrl.replace(/\/$/, '').replace(/\/api\/?$/, '/api/v1')
  : 'http://localhost:5000/api/v1';
const apiClient = axios.create({
  baseURL: BACKEND_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // Attach the token from localStorage before each request
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
