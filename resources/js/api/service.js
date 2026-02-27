import { apiRequest } from "./apiClient";

export async function fetchServices() {
    try {
        const response = await apiRequest("/api/services")

        const result = response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function createService(data) {
    try {
        const response = await apiRequest("/api/services", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function updateService(id, data) {
    try {
        const response = await apiRequest(`/api/services/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
        
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function deleteService(id) {
    try {
        const response = await apiRequest(`/api/services/${id}`, {
            method: "DELETE",
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}