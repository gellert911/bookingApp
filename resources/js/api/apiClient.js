export const apiRequest = async (endpoint, options = {}) => {
    const BASE_URL = '';
    const token = localStorage.getItem('auth_token');

    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        localStorage.removeItem('auth_token');
    }

    return response;
};