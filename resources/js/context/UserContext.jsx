import React, { createContext, useState, useEffect } from 'react';
import { csrfRefresh } from '@/api/auth';
import { apiRequest } from '@/api/apiClient';

export const UserContext = createContext(null)

export function UserProvider ( {children} ) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <UserContext.Provider value={{user, loading, setUser, refreshUser}}>
            {children}
        </UserContext.Provider>
    )
}