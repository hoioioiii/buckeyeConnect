"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//CSS
import styles from "./schedule.module.css";

export default function SchedulePage() {
  const pathname = usePathname();
  const [activityTimes, setActivityTimes] = useState<string[]>([]);
  const [bufferTime, setBufferTime] = useState("15 minutes");

  const tabs = [
    { label: "Basic Info", href: "/profile/basic" },
    { label: "Interests & Tags", href: "/profile/interests" },
    { label: "Schedule", href: "/profile/schedule" },
    { label: "Preferences", href: "/profile/preferences" },
  ];

  const preferredTimes = ["Morning", "Afternoon", "Evening", "Weekend"];

  const handleToggle = (time: string) => {
    setActivityTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
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
        <div className="border-b-2 border-red-500 pb-2">
          <span className="text-red-500">Schedule</span>
        </div>
        <div className="pb-2">
          <Link href="/pages/profile/preferences">
            <span className="text-gray-500">Preferences</span>
          </Link>
        </div>
      </div>

      {/*Connect Schedule*/}
      <div className={styles.connectScheduleCard}>
        <h2 className="mb-2 text-md font-semibold">Connect Your Schedule</h2>
        <p className="mb-4 text-sm text-gray-700">
          Import your class schedule from BuckeyeLink to help find the best
          times for activities.
        </p>
        <Button className={styles.connectButton}>Connect BuckeyeLink</Button>
      </div>

      {/*Activity Times*/}
      <div className="mb-6">
        <h3 className="mb-2 text-md font-semibold">Preferred Activity Times</h3>
        <div className={styles.preferredTimesGrid}>
          {preferredTimes.map((time) => (
            <label key={time} className={styles.preferredTimeItem}>
              <Checkbox
                checked={activityTimes.includes(time)}
                onCheckedChange={() => handleToggle(time)}
              />
              <span>{time}</span>
            </label>
          ))}
        </div>
      </div>

      {/*Time Preferences */}
      <div className="mb-6">
        <h3 className="mb-2 text-md font-semibold">Buffer Time Preferences</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          How much time do you need between activities?
        </p>
        <Select value={bufferTime} onValueChange={setBufferTime}>
          <SelectTrigger
            className={`${styles.selectTriggerBorder} w-full sm:w-64`}
          >
            <SelectValue placeholder="Select Buffer Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15 minutes">15 minutes</SelectItem>
            <SelectItem value="30 minutes">30 minutes</SelectItem>
            <SelectItem value="45 minutes">45 minutes</SelectItem>
            <SelectItem value="1 hour">1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
