import { apiRequest } from "./apiClient";

export async function getAvailableSlots(date) {
    try {
        const response = await apiRequest(`/api/booking/slots?date=${date}`, {
            method: "GET",
        });
    
        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function createAppointment(data) {
    try {
        const response = await apiRequest("/api/appointments", {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result;

    } catch (e) {
        console.error(e);
    }
}

export async function getAppointments(filters) {

    const query = new URLSearchParams(filters).toString();

    try {
        const response = await apiRequest(`/api/appointments?${query}`, { method: "GET" });

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getUserAppointments(id) {
    try {
        const response = await apiRequest(`/api/users/${id}/appointments`, { method: "GET" })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function deleteAppointment(id) {
    try {
        const response = await apiRequest(`/api/appointments/${id}/delete`, { method: "DELETE" })

        const result = await response.json()

        return result;
    } catch (e) {
        console.error(e);
    }
}

// a kettot majd osszehozni?

export async function cancelAppointment(id) {
    try {
        const response = await apiRequest(`/api/appointments/${id}/cancel`, {
            method: "PATCH",
            body: JSON.stringify({"action": "cancel_appointment"})
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}