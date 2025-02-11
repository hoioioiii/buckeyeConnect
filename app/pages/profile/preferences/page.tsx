// app/profile/preferences/page.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function PreferencesPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Setup</h1>

      {/* Profile Navigation Tabs */}
      <div className="flex space-x-8 mb-8 border-b">
        <div className="pb-2">
          <Link href="/pages/profile/basic-info">
            <span className="text-gray-500">Basic Info</span>
          </Link>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/interests">
            <span className="text-gray-500">Interests & Tags</span>
          </Link>
        </div>
        <div className="pb-2">
          <span className="text-gray-500">Schedule</span>
        </div>
        <div className="border-b-2 border-red-500 pb-2">
          <span className="text-red-500">Preferences</span>
        </div>
      </div>

      {/* Distance Preferences */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Distance Preferences</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Up to 0.5 miles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">Up to 0.5 miles</SelectItem>
              <SelectItem value="1">Up to 1 mile</SelectItem>
              <SelectItem value="2">Up to 2 miles</SelectItem>
              <SelectItem value="5">Up to 5 miles</SelectItem>
              <SelectItem value="10">Up to 10 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Friend Matching Preferences */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">
            Friend Matching Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="same-major" />
              <label
                htmlFor="same-major"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Match with same major
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="same-year" />
              <label
                htmlFor="same-year"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Match with same year
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="schedule-compatibility" />
              <label
                htmlFor="schedule-compatibility"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Match based on schedule compatibility
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="show-profile" />
              <label
                htmlFor="show-profile"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show my profile in friend matching
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="show-schedule" />
              <label
                htmlFor="show-schedule"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show my schedule to matches
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
