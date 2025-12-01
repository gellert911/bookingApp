export async function getUser(id) {
    try {
        const response = await fetch(`profile/${id}`, {
            credentials: "include",
            headers:{ "Content-Type": "application/json" }
        })

        const result = response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function updateUser(id, data) {
    try {
        const response = await fetch(`/profile/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function partialUpdateUser(id, data) {
     try {
        const response = await fetch(`/profile/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e)
    }
}

export async function updateUserPassword(id, newPassword) {
    try {
        const response = await fetch(`/profile/${id}/password`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({password: newPassword})
        })

        const result = await response.json()

        return result;
    } catch(e) {
        console.error(e);
    }
}