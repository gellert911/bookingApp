import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export async function login (credentials) {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        return result;


    } catch ($e) {
        console.error($e)
    }
}

export async function logout () {
    try {
        const response = await fetch("/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        
        const result = await response.json();

        return result;

    } catch (e) {
        console.error(e);
    }
}

export async function register(credentials) {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e)
    }
}

export async function refreshCsrf() {
    try {
        const response = await fetch("/csrf-refresh", { credentials: "include" })
        
        const result = await response.json();

        if (result?.token) {
            document.querySelector('meta[name="csrf-token"]').setAttribute("content", result.token);
        }
    } catch (e) {
        console.error(e);
    }
}