// userContext will be used across entire app to track user sessions
'use client'
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      axios.get('/profile', { withCredentials: true })
        .then(({ data }) => {
          console.log("context.tsx: Fetched user from /profile:", data);
          setUser(data);
        });
    }
    console.log("context.tsx: User context value at render:", user);
  }, [user]);

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      router.push('/pages/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}