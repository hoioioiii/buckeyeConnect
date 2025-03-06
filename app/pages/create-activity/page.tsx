"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MapPin, Users } from 'lucide-react'; 
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import "./calendar-icon.css"

export default function CreateActivityPage() {
    const [activityFrequency, setActivityFrequency] = useState('one-time');
    const durationOptions = Array.from({ length: 24 * 12 }, (_, i) => (i + 1) * 5); // Generate duration options from 0 to 1440 minutes in increments of 5
    const [recurrencePattern, setRecurrencePattern] = useState('weekly');
    const [endTime, setEndTime] = useState('endOfSemester');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Logic to format duration in hours and minutes
    const formatDuration = (minutes: number) => {
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

    // Array of days of the week for weekly recurrence selection. Need short and full to differentiate between Ts and Ss, else, when you click one T both Ts will be selected
    const daysOfWeek = [
        { short: 'S', full: 'Sunday' },
        { short: 'M', full: 'Monday' },
        { short: 'T', full: 'Tuesday' },
        { short: 'W', full: 'Wednesday' },
        { short: 'T', full: 'Thursday' },
        { short: 'F', full: 'Friday' },
        { short: 'S', full: 'Saturday' }
    ];

    // Function to toggle day selection for weekly recurrence. If day is already selected, remove it, else add it
    const toggleDaySelection = (day: string) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };


    return (
        <div className='max-w-3xl mx-auto'>
            <div className='flex flex-col max-w-2xl w-full p-6'>
                <h1 className="text-2xl font-semibold mb-6">Create Activity</h1>
                
                {/* Create Activity Form */}
                <form>
                    {/* Activity Type Dropdown */}
                    <div className="flex flex-col mb-6">
                        <label htmlFor="activityType" className='mb-2'>Activity Type</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an activity type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="research">Research</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="club-meeting">Club Meeting</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="study">Study</SelectItem>
                                <SelectItem value="volunteering">Volunteering</SelectItem>
                                <SelectItem value="gaming">Gaming</SelectItem>
                                <SelectItem value="fitness">Fitness</SelectItem>
                                <SelectItem value="free-swag">Free Swag</SelectItem>
                                <SelectItem value="networking">Networking</SelectItem>
                                <SelectItem value="social">Social</SelectItem>
                                <SelectItem value="tech">Tech</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Associated Club Dropdown */}
                    <div className='flex flex-col mb-6'>
                        <label htmlFor="assosicatedClub" className='mb-2'>Associated Club (Optional)</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Select a club'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="8th-floor-improv-comedy-group">8th Floor Improv Comedy Group</SelectItem>
                                <SelectItem value="accounting-association">Accounting Association</SelectItem>
                                <SelectItem value="bangladeshi-student-association">Bangladeshi Student Association</SelectItem>
                                <SelectItem value="colorstack">ColorStack</SelectItem>
                                <SelectItem value="dance-coalition">Dance Coalition</SelectItem>
                                <SelectItem value="ecocar-challenge-team">ECOCAR Challenge Team</SelectItem>
                                <SelectItem value="fantasy-football-club">Fantasy Football Club</SelectItem>
                                <SelectItem value="game-creation-club">Game Creation Club</SelectItem>
                                <SelectItem value="the-happiness-campaign">The Happiness Campaign</SelectItem>
                                <SelectItem value="ice-hockey-womens-sport-club">Ice Hockey - Women's - Sport Club</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location Input Box */}
                    <div className="flex flex-col mb-6">
                        <label htmlFor='location' className='mb-2'>Location</label>
                        <div className="relative"> {/* Relative to place inside Input Box */}
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin size={16} className='text-muted-foreground' />
                            </span>
                        <Input 
                            type='text' 
                            id='location' 
                            name='location' 
                            placeholder= 'Where is this happening?'
                            className='pl-10'
                        />
                        </div>
                    </div>

                    {/* One time or recurring activity */}
                    <div className='mb-6'>
                        <label htmlFor="activityFrequency">Is this a recurring activity?</label>
                        <div className="flex mt-2">
                            <RadioGroup className='flex items-center' value={activityFrequency} onValueChange={setActivityFrequency}>
                                <RadioGroupItem value='one-time' id='one-time'/>
                                <label htmlFor="one-time">One-time</label>
                                <RadioGroupItem value='recurring' id='recurring' className='ml-4'/>
                                <label htmlFor="recurring">Recurring</label>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Render this if one-time activity */}
                    {activityFrequency === 'one-time' && (
                        <div className="flex items-center mb-6">
                            <div className='w-full relative'>
                                <label htmlFor="dateTime">Date & Time</label>
                                <Input
                                    type="datetime-local"
                                    id="dateTime"
                                    name="dateTime"
                                    className="mt-1"
                                />
                            </div>
                            <div className="ml-6 w-full">
                                <label htmlFor="duration" className="">Duration</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {durationOptions.map((minutes) => (
                                            <SelectItem key={minutes} value={minutes.toString()}>
                                                {formatDuration(minutes)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Render this if recurring activity */}
                    {activityFrequency === 'recurring' && (
                        <div className="flex flex-col mb-6 bg-gray-100 rounded-lg p-4">
                            <div>
                                <label htmlFor="recurrence">Recurrence Pattern</label>
                                <Select value={recurrencePattern} onValueChange={setRecurrencePattern}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select recurrence pattern" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                                {/* If weekly render days of week so user can select */}
                                {recurrencePattern === 'weekly' && (
                                    <div className="flex justify-between mt-4">
                                        {daysOfWeek.map((day) => (
                                            <button
                                                key={day.full}
                                                type="button"
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    selectedDays.includes(day.full) ? 'bg-blue-500 text-white' : 'border border-gray-300'
                                                }`}
                                                onClick={() => toggleDaySelection(day.full)}
                                            >
                                                {day.short}
                                            </button>
                                        ))}
                                    </div>
                                 )}
                                 {/* Start date and start time for user event */}
                                <div className="flex mt-4 items-center mb-4">
                                    <div className='w-full relative'>
                                        <label htmlFor="dateTime">Start Date & Time</label>
                                        <Input
                                            type="datetime-local"
                                            id="dateTime"
                                            name="dateTime"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="ml-6 w-full">
                                        <label htmlFor="duration" className="">Duration</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {durationOptions.map((minutes) => (
                                                    <SelectItem key={minutes} value={minutes.toString()}>
                                                        {formatDuration(minutes)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {/* Event end date selection */}
                                <div className="">
                                    <label htmlFor="endTime" className='block'>Ends</label>
                                    <Select value={endTime} onValueChange={setEndTime}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select end date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="endOfSemester">End of semester</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                            <SelectItem value="on">On</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {endTime === 'on' && (
                                        <div>
                                            <label htmlFor="endDateTime" className='mt-4 block'>Select End Date</label>
                                            <Input
                                                type="date"
                                                id="endDateTime"
                                                name="endDateTime"
                                                className="mt-1 w-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Max participants input */}
                    <div className="flex flex-col mb-6">
                        <label htmlFor="maxParticipants" className='mb-2'>Maximum Participants</label>
                        <div className="relative"> {/* Relative to place inside Input Box */}
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Users size={16} className='text-muted-foreground' />
                            </span>
                            <Input 
                                type="number"
                                placeholder='How many people can join?'
                                className='pl-10'
                            />
                        </div>
                    </div>

                    {/* Description input */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className='mb-2'>Description</label>
                        <Textarea 
                            id="description" 
                            name="description" 
                            placeholder="Tell people more about your activity..." 
                            className='h-32 p-2'
                        />
                    </div>

                    <Button type="submit" className='mt-6'>Create</Button>
                </form>
            </div>
        </div>
    );
};

