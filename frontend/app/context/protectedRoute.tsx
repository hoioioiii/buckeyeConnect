'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/userContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const userContext = useContext(UserContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isValidUser = (user: any) => {
            // Add validation logic to ensure the user object is valid
            return user && typeof user.email === 'string' && typeof user.name === 'string';
        };

        if (userContext?.user && isValidUser(userContext.user)) {
            setLoading(false); // User is logged in and valid, stop loading
        } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (isValidUser(parsedUser)) {
                    // Restore user from localStorage if valid
                    userContext?.setUser(parsedUser);
                    setLoading(false);
                } else {
                    // Invalid user data, clear storage and redirect
                    localStorage.removeItem('user');
                    router.push('/pages/login');
                }
            } else {
                // Redirect to login if no user is found
                router.push('/pages/login');
            }
        }
    }, [userContext, router]);

    return <>{children}</>;
};