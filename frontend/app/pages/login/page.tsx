"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from "react-hot-toast";
import { UserContext } from '@/app/context/userContext';

export default function Login() {

  const userContext = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContext?.loginUser) {
      toast.error('Login function not available.');
      return;
    }
    await userContext.loginUser(data.email, data.password);
  };

  return (
    <div className="bg-gray-200 h-full">
      <h1 className="text-2xl font-bold text-red-600 pl-8 pt-8">Buckeye Connect</h1>
      <div className="flex items-center h-screen">
        <div className="flex items-center justify-center mx-auto bg-white p-8 rounded-lg shadow-xl">
          <div className="mr-16 space-y-4">
            <p>Start connecting with clubs around campus!</p>
            <p className="font-bold">Sign In to BuckeyeConnect</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
              </div>
              <Button type="submit" className="bg-red-600">Sign In</Button>
            </form>
            <p>Don&#39;t have an account? <a href="/pages/register" className="text-red-600">Sign Up</a></p>
          </div>
          <div>
            <Image src={"/login_graphic.webp"} width={300} height={525} alt="Login Graphic" placeholder="blur" blurDataURL={'/login_graphic.webp'} />
          </div>
        </div>
      </div>
    </div>
  );
}