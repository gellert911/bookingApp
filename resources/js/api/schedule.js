export async function updateSchedule(employeeId, schedule) {
    try {
        const response = await fetch(`schedules/${employeeId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
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
        const response = await fetch(`schedules/${employeeId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e)
    }
}