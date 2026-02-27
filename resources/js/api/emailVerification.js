import { apiRequest } from './apiClient'

export async function requestVerificationEmail () {
    try {
        const response = await apiRequest("/api/auth/email/verify/resend", {
            method: "POST",
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function verifyEmail(token) {
    try {
        const response = await apiRequest(`/api/auth/email/verify`, {
            method: "POST",
            body: JSON.stringify({token: token})
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}