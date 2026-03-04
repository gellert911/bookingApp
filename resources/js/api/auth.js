import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { apiRequest } from './apiClient';


export async function login (credentials) {
    try {
        const response = await apiRequest("/login", {
            method: "POST",
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
        const response = await apiRequest("/logout", {
            method: "POST",
        })
        
        const result = await response.json();
        return result;

    } catch (e) {
        console.error(e);
    }
}

export async function register(credentials) {
    try {
        const response = await apiRequest("/register", {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e)
    }
}

export async function csrfRefresh() {
    try {
        const response = await apiRequest("/sanctum/csrf-cookie", {});
    } catch (e) {
        console.error(e);
    }
}