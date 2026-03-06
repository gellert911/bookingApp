import React, { createContext, useState, useEffect } from 'react';
import { csrfRefresh, logout } from '@/api/auth';
import { apiRequest } from '@/api/apiClient';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null)

export function UserProvider ( {children} ) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const refreshUser = async () => {
        try {
            await csrfRefresh();

            const response = await apiRequest("/user", {method: 'GET'})

            if (response.ok) {
                const result = await response.json()
                setUser(result);
            } else {
                setUser(null);
            }
        } catch (e) {
            setUser(null)
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const logoutUser = async () => {
        try {
            const result = await logout();

            if (result.success) {
                setUser(null)                
                navigate("/")
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <UserContext.Provider value={{user, loading, setUser, refreshUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}