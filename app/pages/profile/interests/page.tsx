// app/profile/preferences/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
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
        <div className="border-b-2 border-red-500 pb-2">
          <span className="text-red-500">Interests & Tags</span>
        </div>
        <div className="pb-2">
          <span className="text-gray-500">Schedule</span>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/preferences">
            <span className="text-gray-500">Preferences</span>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Interest Tags</h2>
          <InterestBadges></InterestBadges>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Academic Interests</h2>
          <AcademicBadges></AcademicBadges>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Activity Preferences</h2>
          <ActivityBadges></ActivityBadges>
        </div>
      </div>
    </div>
  );
}

function InterestBadges() {
  const badges = [
    "Sports",
    "Gaming",
    "Music",
    "Art",
    "Technology",
    "Fitness",
    "Food",
    "Travel",
  ];
  return badgeList(badges);
}

function AcademicBadges() {
  const badges = [
    "Research",
    "Study Groups",
    "Tutoring",
    "Projects",
    "Lab Work",
  ];
  return badgeList(badges);
}

function ActivityBadges() {
  const badges = [
    "Group Activities",
    "One-on-one",
    "Weekend Events",
    "Evening Events",
  ];
  return badgeList(badges);
}

function badgeList(badgeNames: string[]) {
  const badges = [];
  for (const i in badgeNames) {
    badges.push(
      <Badge key={i} className="mr-2" variant="outline">
        {badgeNames[i]}
      </Badge>,
    );
  }
  return <>{badges}</>;
}
