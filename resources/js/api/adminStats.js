export async function getOverviewStats(interval) {

    const query = new URLSearchParams(interval)

    try {
        const response = await fetch(`/admin/stats/overview?${query}`, { credentials: "include" })

        return await response.json();
    } catch (e) {
        console.error(e)
    }
}