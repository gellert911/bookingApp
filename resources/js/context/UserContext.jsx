import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null)

export function UserProvider ( {children} ) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const refreshUser = async () => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/user", {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const result = await response.json()
                setUser(result);
            } else {
                localStorage.removeItem("auth_token");
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