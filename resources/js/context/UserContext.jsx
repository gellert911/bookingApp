import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null)

export function UserProvider ( {children} ) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const refreshUser = async () => {
        
        try {
            const response = await fetch("/user", {
                method: 'GET',
                credentials: 'include',
            })

            const result = await response.json()

            if (!result) {
                throw ("not logged in")
            }
            setUser(result);
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