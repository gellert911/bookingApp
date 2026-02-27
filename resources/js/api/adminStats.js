import { apiRequest } from '@/api/apiClient';

export async function getOverviewStats(interval) {

    const query = new URLSearchParams(interval)

    try {
        const response = await apiRequest(`/api/admin/stats/overview?${query}`) //fetch(`/api/admin/stats/overview?${query}`, { credentials: "include" })

        return await response.json();
    } catch (e) {
        console.error(e)
    }
}