import { apiRequest } from '@/api/apiClient';

export async function getOverviewStats(interval) {

    const query = new URLSearchParams(interval)

    try {
        const response = await apiRequest(`/admin/stats/overview?${query}`)

        return await response.json();
    } catch (e) {
        console.error(e)
    }
}