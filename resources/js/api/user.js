import { apiRequest } from './apiClient';

export async function getUser(id) {
    try {
        const response = await apiRequest(`/api/profile/${id}`, {})

        const result = response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function updateUser(id, data) {
    try {
        const response = await apiRequest(`/api/profile/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function partialUpdateUser(id, data) {
     try {
        const response = await apiRequest(`/api/profile/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function updateUserPassword(id, newPassword) {
    try {
        const response = await apiRequest(`/api/profile/${id}`, {
            method: "PATCH",
            body: JSON.stringify({password: newPassword})
        })

        const result = await response.json()

        return result;
    } catch(e) {
        console.error(e);
    }
}

export async function deleteUser(id) {
    try {
        const response = await apiRequest(`/api/users/${id}`, { method: "DELETE" })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}