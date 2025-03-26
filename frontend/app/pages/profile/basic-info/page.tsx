"use client";

import { useContext, useEffect, useState } from 'react';
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
import { getUserProfile, updateUserProfile, UserProfile } from '@/app/services/profile/basic-info/api';

export default function BasicInfoPage() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const { user, logout } = userContext;

  // Form state
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(""); // New: success message state

  // Load user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      setLoading(true);
      const data = await getUserProfile(user.id);
      if (data) {
        setProfile(data);
      } else {
        setError("Failed to load profile");
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user?.id]);

  // Handle update
  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setError("");
    setSuccessMessage("");

    const success = await updateUserProfile(user.id, profile);
    if (success) {
      setSuccessMessage("Your changes have been saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide after 3 seconds
    } else {
      setError("Failed to save profile");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Setup</h1>

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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
              {successMessage}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              type="text"
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Major</label>
            <Input
              type="text"
              value={profile.major || ''}
              onChange={(e) => setProfile({ ...profile, major: e.target.value })}
              placeholder="Enter your major"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <Select
              value={profile.year || ''}
              onValueChange={(value) => setProfile({ ...profile, year: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
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
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Location Settings</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                Your location is used to show relevant activities near you.
              </p>
              <button
                className="flex items-center text-blue-500 hover:text-blue-600"
                onClick={() =>
                  setProfile({ ...profile, enable_location: !profile.enable_location })
                }
              >
                <MapPin className="w-4 h-4 mr-2" />
                {profile.enable_location ? "Disable" : "Enable"} Location Services
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleSave}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {user ? (
              <button onClick={logout} className="text-gray-500 underline">
                Logout
              </button>
            ) : (
              <Link href="/pages/login">
                <span className="text-red-600 underline">Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
