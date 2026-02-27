import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { apiRequest } from './apiClient';


export async function login (credentials) {
    try {
        const response = await apiRequest("/api/login", {
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
    const token = localStorage.getItem("auth_token");
    try {
        const response = await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const response = await apiRequest("/api/register", {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.log(e)
    }
}