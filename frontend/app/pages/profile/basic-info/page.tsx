// app/profile/basic-info/page.tsx
"use client";

import { useContext } from 'react';
import { UserContext } from '@/app/context/userContext';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

export default function BasicInfoPage() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const { user, logout } = userContext;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Setup</h1>

      {/* Profile Navigation Tabs */}
      <div className="flex space-x-8 mb-8 border-b">
        <div className="border-b-2 border-red-500 pb-2">
          <span className="text-red-500">Basic Info</span>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/interests">
            <span className="text-gray-500">Interests & Tags</span>
          </Link>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/schedule">
            <span className="text-gray-500">Schedule</span>
          </Link>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/preferences">
            <span className="text-gray-500">Preferences</span>
          </Link>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input type="text" placeholder="Enter your name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Major</label>
          <Input type="text" placeholder="Enter your major" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Freshman" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freshman">Freshman</SelectItem>
              <SelectItem value="sophomore">Sophomore</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            className="w-full min-h-[100px] p-2 border rounded-md"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Location Settings */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Location Settings</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-4">
              Your location is used to show relevant activities near you.
            </p>
            <button className="flex items-center text-blue-500 hover:text-blue-600">
              <MapPin className="w-4 h-4 mr-2" />
              Enable Location Services
            </button>
          </div>
        </div>

        <div className='mt-8'>
          {user ? (
            <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          ) : (
            <Link href="/pages/login" className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
