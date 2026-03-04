import { apiRequest } from "./apiClient";

export default async function fetchAuditLogs(page) {
    try {
        const response = await apiRequest(`/audit-logs?page=${page}`, {})

        return await response.json()
    } catch (e) {
        console.error(e);
    }
}