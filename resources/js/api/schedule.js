import { apiRequest } from "./apiClient";

export async function updateSchedule(employeeId, schedule) {
    try {
        const response = await apiRequest(`/api/schedules/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify(schedule),
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getSchedule(employeeId) {
    try {
        const response = await apiRequest(`/api/schedules/${employeeId}`, { method: "GET" });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e)
    }
}