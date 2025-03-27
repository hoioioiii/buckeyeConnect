"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { getUserPreferences, updateUserPreferences, UserPreferences } from "@/app/services/profile/preferences/api";

export default function PreferencesPage() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useContext must be used within a UserContextProvider");
  }

  const { user } = userContext;

  // Form state
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New: success message state

  // Load user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user?.id) return;
      setLoading(true);
      const data = await getUserPreferences(user.id);
      if (data) {
        setPreferences(data);
      } else {
        setError("Failed to load preferences");
      }
      setLoading(false);
    };

    fetchPreferences();
  }, [user?.id]);

  // Handle Save
  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setError("");
    setSuccessMessage("");

    const success = await updateUserPreferences(user.id, preferences);
    if (success) {
      setSuccessMessage("Your changes have been saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide after 3 seconds
    } else {
      setError("Failed to save preferences");
    }
    setSaving(false);
  };

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
          <Link href="/pages/profile/schedule">
            <span className="text-gray-500">Schedule</span>
          </Link>
        </div>
        <div className="border-b-2 border-red-500 pb-2">
          <span className="text-red-500">Preferences</span>
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

          {/* Distance Preferences */}
          <div>
            <h2 className="text-lg font-medium mb-4">Distance Preferences</h2>
            <Select
              value={preferences.distance_preference || ""}
              onValueChange={(value) =>
                setPreferences({ ...preferences, distance_preference: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Distance" />
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
                <Checkbox
                  id="same-major"
                  checked={preferences.match_same_major || false}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, match_same_major: checked === true })
                  }
                />
                <label htmlFor="same-major" className="text-sm font-medium">
                  Match with same major
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="same-year"
                  checked={preferences.match_same_year || false}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, match_same_year: checked === true })
                  }
                />
                <label htmlFor="same-year" className="text-sm font-medium">
                  Match with same year
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="schedule-compatibility"
                  checked={preferences.match_schedule || false}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, match_schedule: checked === true })
                  }
                />
                <label htmlFor="schedule-compatibility" className="text-sm font-medium">
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
                <Checkbox
                  id="show-profile"
                  checked={preferences.show_profile || false}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, show_profile: checked === true })
                  }
                />
                <label htmlFor="show-profile" className="text-sm font-medium">
                  Show my profile in friend matching
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-schedule"
                  checked={preferences.show_schedule || false}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, show_schedule: checked === true })
                  }
                />
                <label htmlFor="show-schedule" className="text-sm font-medium">
                  Show my schedule to matches
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
