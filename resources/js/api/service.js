export async function fetchServices() {
    try {
        const response = await fetch("/services", { credentials: "include" })

        const result = response.json();

        return result;
    } catch (e) {
        console.error(e);
    }
}