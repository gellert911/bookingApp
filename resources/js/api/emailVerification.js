export async function requestVerificationEmail () {
    try {
        const response = await fetch("/email/verification/resend", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function verifyEmail(token) {
    try {
        const response = await fetch(`/email/verification/verify/${token}`, {
            method: "GET",
            credentials: "include",
        })

        return await response.json();
    } catch (e) {
        console.error(e);
    }
}