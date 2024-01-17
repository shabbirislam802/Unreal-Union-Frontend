import axios from'axios';
import User from '@/helper/user.js';

export const unrealUnionBackend = axios.create({
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const unrealUnionBackendAuth = axios.create({
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

unrealUnionBackendAuth.interceptors.request.use((config) => {
    const token = User.getUserToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});