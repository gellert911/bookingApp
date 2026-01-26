export async function requestPasswordReset(email) {
    try {
        const response = await fetch("/auth/forgot-password", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ email })
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function sendPasswordReset(token, newPassword) {
    try {
        const response = await fetch("/auth/reset-password/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ token, newPassword })
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}