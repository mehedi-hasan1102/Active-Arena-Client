import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem('authToken'); // Assuming you store your token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized, e.g., redirect to login
          console.error('Unauthorized: Please log in.');
          // Example: window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Forbidden: You do not have permission to access this resource.');
          break;
        case 404:
          // Not Found
          console.error('Not Found: The requested resource could not be found.');
          break;
        case 500:
          // Server Error
          console.error('Server Error: Something went wrong on the server.');
          break;
        default:
          console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
      }
    } else if (error.request) {
      // No response received
      console.error('Network Error: No response received from server.');
    } else {
      // Something else happened in setting up the request
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
