"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {

  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // When user clicks Sign Up button
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      // Try to register user
      const response = await axios.post('/register', { name, email, password });
      if (response.data.error) {
        toast.error(response.data.error); // i.e. "Email already exists"
      } else {
        setData({ name: "", email: "", password: "" }); // Reset form with default values
        toast.success("Registration successful. Welcome to BuckeyeConnect!");
        // Use window.location.href as an alternative to router.push
        setTimeout(() => {
          router.push('/pages/main-feed'); // Redirect to main page
        }, 2000); // 2-second delay
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-200 h-full">
      <h1 className="text-2xl font-bold text-red-600 pl-8 pt-8">Buckeye Connect</h1>
      <div className="flex items-center h-screen">
        <div className="flex items-center justify-center mx-auto bg-white p-8 rounded-lg shadow-xl">
          <div className="mr-16 space-y-4">
            <p>Start connecting with clubs around campus!</p>
            <p className="font-bold">Sign Up to BuckeyeConnect</p>
            <form onSubmit={registerUser} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
              </div>
              <Button type="submit" className="bg-red-600">Sign Up</Button>
            </form>
            <p>Already have an account? <a href="/pages/login" className="text-red-600">Login</a></p>
          </div>
          <div>
            <Image src={"/login_graphic.webp"} width={300} height={525} alt="Login Graphic" placeholder="blur" blurDataURL={'/login_graphic.webp'} />
          </div>
        </div>
      </div>
    </div>
  );
}