export async function fetchServices() {
    try {
        const response = await fetch("/services", { credentials: "include" })

        const result = response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function createService(data) {
    try {
        const response = await fetch("/services", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
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
        const response = await fetch(`/services/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })
        
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function deleteService(id) {
    try {
        const response = await fetch(`/services/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}