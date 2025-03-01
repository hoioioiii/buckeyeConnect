// userContext will be used across entire app to track user sessions
'use client'
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null); // null assume no user is logged in

    // runs every time the component mounts
    useEffect(() => {
        if (!user) { 
            axios.get('/profile')
            .then((({data}) => {
                setUser(data)
            }))
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}