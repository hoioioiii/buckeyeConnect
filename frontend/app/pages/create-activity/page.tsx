"use client";
import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import "./calendar-icon.css";

import {
  getActivityTypeList,
  getClubTypeList,
  getRecurrancePatternTypeList,
} from "@/app/services/local_data/local_data_apis";

import { get } from "http";
import { ELASTICSEARCH_CONSTANTS } from "@/lib/constants";
import { Activity_Temp } from "@/lib/types";
import { addActivity } from "@/app/services/create/create_api";
import { redirect } from "next/navigation";
const CreateActivityPage = () => {
  const [activityFrequency, setActivityFrequency] = useState("one-time");

  const [recurrencePattern, setRecurrencePattern] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activityType, setActivityType] = useState<string[]>([]);
  const [clubList, setClubList] = useState<string[]>([]);
  const [recurrenceList, setRecurrenceList] = useState<string[]>([]);
  const [durationList, setDurationList] = useState<string[]>([]);
  const [daysEnabledList, setdaysEnabledList] = useState<string[]>([]);
  const [endingPattern, setEndingPattern] = useState<string[]>([]);

  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMaxParticipants, setSelectedMaxParticipants] = useState(0);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDaysEnabled, setSelectedDaysEnabled] = useState<string[]>([]);
  const [selectedEndingPattern, setSelectedEndingPattern] = useState("");

  // Logic to format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    console.log("Minutes:", minutes);
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes < 120) {
      const remainingMinutes = minutes % 60;
      return remainingMinutes === 0
        ? `1 hour`
        : `1 hour and ${remainingMinutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes === 0
        ? `${hours} hours`
        : `${hours} hours and ${remainingMinutes} minutes`;
    }
  };

  // Function to toggle day selection for weekly recurrence. If day is already selected, remove it, else add it
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let pass = true;
      getActivityTypeList().then((response) => {
        console.log("API Response1:", response);

        if (response?.success) {
          pass = true;
          console.log("Setting activityType with:", response.data);
          setActivityType(response?.data);
        } else {
          pass = false;
          console.error("Error fetching activity types:", response?.error);
        }
      });
      getClubTypeList().then((response) => {
        console.log("API Response2:", response);

        if (response?.success) {
          pass = true;
          console.log("Setting club with:", response.data);
          setClubList(response?.data);
        } else {
          pass = false;
          console.error("Error fetching club types:", response?.error);
        }
      });

      getRecurrancePatternTypeList(
        ELASTICSEARCH_CONSTANTS.RECURRENCES_PATTERN_ALL
      ).then((response) => {
        console.log("API Response3:", response);
        if (response?.success) {
          pass = true;
          console.log("Setting recurrancePattern with:", response);
          setRecurrenceList(response?.data?.recurrences_pattern[0]);
          setDurationList(response?.data?.duration_minutes[0]);
          setEndingPattern(response?.data?.ending_pattern[0]);
          setdaysEnabledList(response?.data?.days_enabled[0]);
        } else {
          pass = false;
          console.error(
            "Error fetching recurrancePattern types:",
            response?.error
          );
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("Updated activityType:", activityType);
    console.log("Updated clubList:", clubList);
    console.log("Updated recurrenceList:", recurrenceList);
    console.log("Updated durationList:", durationList);
    console.log("Updated daysEnabledList:", daysEnabledList);
    console.log("Updated endingPattern:", endingPattern);
  }, [
    activityType,
    clubList,
    recurrenceList,
    durationList,
    daysEnabledList,
    endingPattern,
  ]);

  // Array of days of the week for weekly recurrence selection. Need short and full to differentiate between Ts and Ss, else, when you click one T both Ts will be selected

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //form data

    //get todays date
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    //end date is today + selected duration
    const endDate = new Date(today);
    endDate.setMinutes(endDate.getMinutes() + Number(selectedDuration));

    const activity: Activity_Temp = {
      title: "Temp Title, - Fix later",
      activity_type: selectedActivity,
      club: selectedClub,
      location: selectedLocation,
      max_spots: selectedMaxParticipants,
      filled_spots: 0,
      description: selectedDescription,
      start_date: selectedStartDate,
      end_date: endDate,
      created_on: date,
      created_by: "temp-user",
      major: "temp-user-info",
      year: today.getFullYear(), //this data is set to change
      tags: ["Research", "Neuroscience", "Paid", "MRI Study", "Volunteering"],
      distance: 0.8,
      distance_value: 0.8,
      recurring: {
        enabled: activityFrequency === "recurring",
      },
    };

    console.log("Activity:", activity);
    redirect("/pages/main-feed");
    //send
    // addActivity(activity).then((response) => {
    //   if (response?.success) {
    //     console.log("Activity created successfully:", response);

    //     router.push("/pages/main-feed");
    //   } else {
    //     console.error("Error creating activity:", response?.error);
    //   }
    // });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col max-w-2xl w-full p-6">
        <h1 className="text-2xl font-semibold mb-6">Create Activity</h1>

        {/* Create Activity Form */}
        <form onSubmit={handleSubmit}>
          {/* Activity Type Dropdown */}
          <div className="flex flex-col mb-6">
            <label htmlFor="activityType" className="mb-2">
              Activity Type
            </label>
            <Select
              value={selectedActivity}
              onValueChange={setSelectedActivity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityType?.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Associated Club Dropdown */}
          <div className="flex flex-col mb-6">
            <label htmlFor="assosicatedClub" className="mb-2">
              Associated Club (Optional)
            </label>
            <Select value={selectedClub} onValueChange={setSelectedClub}>
              <SelectTrigger>
                <SelectValue placeholder="Select a club" />
              </SelectTrigger>
              <SelectContent>
                {clubList?.map((club) => (
                  <SelectItem key={club} value={club}>
                    {club}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Input Box */}
          <div className="flex flex-col mb-6">
            <label htmlFor="location" className="mb-2">
              Location
            </label>
            <div className="relative">
              {" "}
              {/* Relative to place inside Input Box */}
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-muted-foreground" />
              </span>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="Where is this happening?"
                className="pl-10"
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </div>
          </div>

          {/* One time or recurring activity */}
          <div className="mb-6">
            <label htmlFor="activityFrequency">
              Is this a recurring activity?
            </label>
            <div className="flex mt-2">
              <RadioGroup
                className="flex items-center"
                value={activityFrequency}
                onValueChange={setActivityFrequency}
              >
                <RadioGroupItem value="one-time" id="one-time" />
                <label htmlFor="one-time">One-time</label>
                <RadioGroupItem
                  value="recurring"
                  id="recurring"
                  className="ml-4"
                />
                <label htmlFor="recurring">Recurring</label>
              </RadioGroup>
            </div>
          </div>

          {/* Render this if one-time activity */}
          {activityFrequency === "one-time" && (
            <div className="flex items-center mb-6">
              <div className="w-full relative">
                <label htmlFor="dateTime">Date & Time</label>
                <Input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  className="mt-1"
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                />
              </div>
              <div className="ml-6 w-full">
                <label htmlFor="duration" className="">
                  Duration
                </label>
                <Select
                  value={Number(selectedDuration)}
                  onValueChange={(value) => setSelectedDuration(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationList.map((minutes) => (
                      <SelectItem key={minutes} value={minutes}>
                        {formatDuration(Number(minutes))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Render this if recurring activity */}
          {activityFrequency === "recurring" && (
            <div className="flex flex-col mb-6 bg-gray-100 rounded-lg p-4">
              <div>
                <label htmlFor="recurrence">Recurrence Pattern</label>
                <Select
                  value={recurrencePattern}
                  onValueChange={setRecurrencePattern}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recurrence pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {recurrenceList.map((pattern) => (
                      <SelectItem key={pattern} value={pattern}>
                        {pattern}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* If weekly render days of week so user can select */}
                {recurrencePattern === "weekly" && (
                  <div className="flex justify-between mt-4">
                    {daysEnabledList.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedDays.includes(day)
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300"
                        }`}
                        onClick={() => toggleDaySelection(day)}
                      >
                        {day.charAt(0)}
                      </button>
                    ))}
                  </div>
                )}
                {/* Start date and start time for user event */}
                <div className="flex mt-4 items-center mb-4">
                  <div className="w-full relative">
                    <label htmlFor="dateTime">Start Date & Time</label>
                    <Input
                      type="datetime-local"
                      id="dateTime"
                      name="dateTime"
                      className="mt-1"
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                    />
                  </div>
                  <div className="ml-6 w-full">
                    <label htmlFor="duration" className="">
                      Duration
                    </label>
                    <Select
                      value={Number(selectedDuration)}
                      onValueChange={setSelectedDuration}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationList.map((minutes) => (
                          <SelectItem key={minutes} value={minutes.toString()}>
                            {formatDuration(Number(minutes))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Event end date selection */}
                <div className="">
                  <label htmlFor="endTime" className="block">
                    Ends
                  </label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select end date" />
                    </SelectTrigger>
                    <SelectContent>
                      {endingPattern.map((pattern) => (
                        <SelectItem key={pattern} value={pattern}>
                          {pattern}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {endTime === "on" && (
                    <div>
                      <label htmlFor="endDateTime" className="mt-4 block">
                        Select End Date
                      </label>
                      <Input
                        type="date"
                        id="endDateTime"
                        name="endDateTime"
                        className="mt-1 w-auto"
                        onChange={(e) => setSelectedEndDate(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Max participants input */}
          <div className="flex flex-col mb-6">
            <label htmlFor="maxParticipants" className="mb-2">
              Maximum Participants
            </label>
            <div className="relative">
              {" "}
              {/* Relative to place inside Input Box */}
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={16} className="text-muted-foreground" />
              </span>
              <Input
                type="number"
                placeholder="How many people can join?"
                className="pl-10"
                onChange={(e) =>
                  setSelectedMaxParticipants(Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Description input */}
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell people more about your activity..."
              className="h-32 p-2"
              onChange={(e) => setSelectedDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-6">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CreateActivityPage;
