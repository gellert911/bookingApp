export async function getAvailableSlots(date) {
    try {
        const response = await fetch(`/booking/slots?date=${date}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function createAppointment(data) {
    try {

        const response = await fetch("/appointments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
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
        const response = await fetch(`/appointments?${query}`, {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getUserAppointments(id) {
    try {
        const response = await fetch(`/users/${id}/appointments`, {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function deleteAppointment(id) {
    try {
        const response = await fetch(`appointments/${id}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
        })

        const result = await response.json()

        return result;
    } catch (e) {
        console.error(e);
    }
}

// a kettot majd osszehozni?

export async function cancelAppointment(id) {
    try {
        const response = await fetch(`/appointments/${id}/cancel`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({"action": "cancel_appointment"})
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}