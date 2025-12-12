import axios from 'axios';

const API_BASE_URL = 'https://task-manager-backend-hfsp.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

export const taskService = {
    getAllTasks: () => api.get('/tasks'),
    createTask: (taskData) => api.post('/tasks', taskData),
    updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    getTasksByStatus: (completed) => api.get(`/tasks/status/${completed}`),
};

export default api;