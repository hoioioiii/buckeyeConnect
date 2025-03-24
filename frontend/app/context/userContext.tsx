// userContext will be used across entire app to track user sessions
'use client'
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Restore user from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage
      axios.get('/profile');
    } else {
      // If nothing in localStorage, verify the session with the backend
      console.log("Checking user session...");
      axios
        .get('/profile')
        .then(({ data }) => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data)); // Save user to localStorage
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('user'); // Clear localStorage if session is invalid
        });
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post('/login', { email, password });
      console.log("Logging in user...");
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        const userData = {
          email: response.data.email,
          id: response.data._id,
          name: response.data.name,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success("Login successful. Welcome to BuckeyeConnect!");
        router.push('/pages/main-feed');
      }
    } catch (error) {
      console.error("Error on sign in:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      localStorage.removeItem('user'); // Clear user from localStorage
      router.push('/pages/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}