import { getCookie } from '@/utility/helpers';
import { csrfRefresh } from './auth';

export const apiRequest = async (endpoint, options = {}) => {
    const BASE_URL = '';

    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const request = async () => {
        return await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            credentials: 'include',
            headers: {
                ...defaultHeaders,
                "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
                ...options.headers,
            },
        });
    }

    let response = await request()

    if (response.status === 419) {
        await csrfRefresh();

        response = await request()
    }

    if (response.status === 401) {
        //window.location.href = "/login";
    }

    return response;
};