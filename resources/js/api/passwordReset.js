import { apiRequest } from './apiClient';

export async function requestPasswordReset(email) {
    try {
        const response = await apiRequest("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email })
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function sendPasswordReset(token, newPassword) {
    try {
        const response = await apiRequest("/api/auth/reset-password/", {
            method: "POST",
            body: JSON.stringify({ token, newPassword })
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}