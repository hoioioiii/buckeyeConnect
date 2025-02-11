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
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <div>
      <div className={styles.pageContainer}>
        <h1 className="mb-4 text-2xl font-semibold">Profile Setup</h1>
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={isActive ? styles.tabLinkActive : styles.tabLink}>
                {tab.label}
              </Link>
            );
          })}
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
          <h3 className="mb-2 text-md font-semibold">
            Preferred Activity Times
          </h3>
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
          <h3 className="mb-2 text-md font-semibold">
            Buffer Time Preferences
          </h3>
          <p className="mb-2 text-sm text-muted-foreground">
            How much time do you need between activities?
          </p>
          <Select value={bufferTime} onValueChange={setBufferTime}>
            <SelectTrigger
              className={`${styles.selectTriggerBorder} w-full sm:w-64`}>
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => alert("Go Back")}>
            Back
          </Button>
          <Button
            className={styles.continueButton}
            onClick={() => alert("Continue")}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
