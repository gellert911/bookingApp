export default async function fetchAuditLogs(page) {
    try {
        const response = await fetch(`/audit-logs?page=${page}`, { 
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        return await response.json()
    } catch (e) {
        console.error(e);
    }
}