import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor to include the authentication token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authenticatedUser');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor to handle responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors, such as redirecting to login on 401
        if (error.response && error.response.status === 401) {
            // Redirect to login or handle token refresh
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;