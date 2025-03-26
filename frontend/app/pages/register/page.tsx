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
    <div
      className="relative bg-center h-full min-h-screen"
      style={{ backgroundImage: "url('/osu_background_small.webp')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative">
        <h1 className="text-2xl font-bold text-red-600 pl-4 pt-4 md:pl-8 md:pt-8">BuckeyeConnect</h1>

        <div className="flex items-center justify-center h-[calc(100vh-4rem)] px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-4xl">
            <div className="space-y-4 p-6 md:pl-24 md:pr-16 md:py-8 text-center md:text-left">
              <p className="text-lg md:text-xl">Start connecting with clubs around campus!</p>
              <p className="font-bold text-lg md:text-xl">Sign Up to BuckeyeConnect</p>
              <form onSubmit={registerUser} className="space-y-6">
                <div>
                  <Label className="text-sm md:text-lg" htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="text-sm md:text-lg" htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="text-sm md:text-lg" htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600">Sign Up</Button>
              </form>
              <p className="text-sm md:text-base">
                Already have an account? <a href="/pages/login" className="text-red-600">Login</a>
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src={"/login_graphic.webp"}
                width={400}
                height={525}
                alt="Login Graphic"
                placeholder="blur"
                blurDataURL={'/login_graphic.webp'}
                className="rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}