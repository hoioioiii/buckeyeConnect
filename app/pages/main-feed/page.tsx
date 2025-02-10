"use client";
import React, { useState } from 'react';
import { Search, MessageCircle, Plus, Star, Users, Clock, Zap, MapPin } from 'lucide-react';
import { MOCK_ACTIVITIES } from '@/lib/mock-data';

const MainFeed = () => {
    const [activeTab, setActiveTab] = useState('activities');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // This will be replaced once database is set up.
    // Mock data for activities
    const [activities] = useState(MOCK_ACTIVITIES);

    const tags = [
        'Research', 'Sports', 'Club Meeting', 'Food', 'Study', 'Volunteering', 'Gaming', 'Fitness', 'Free Swag', 'Networking', 'Social', 'Tech'
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
          {/* Header Navigation */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
    
            {/* TODO: AI Suggestions */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Zap size={20} />
                <h3 className="font-semibold">AI Suggestions</h3>
              </div>
              <p className="text-sm text-blue-600">
                Based on your schedule, you have a 2-hour gap between classes today. 
                Here are some activities that might interest you:
              </p>
            </div>
    
            {/* TODO: Tag Filtering */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
    
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search activities (try: 'volleyball near RPAC')"
                  className="w-full p-3 pr-12 rounded-lg border border-gray-300"
                />
                <Search className="absolute right-4 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-3 text-sm">
                <select className="border rounded p-2">
                  <option>Any Distance</option>
                  <option>Within 0.5 miles</option>
                  <option>Within 1 mile</option>
                </select>
                <select className="border rounded p-2">
                  <option>Any Time</option>
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                </select>
                <select className="border rounded p-2">
                  <option>All Majors</option>
                  <option>Same Major</option>
                  {/* TO BE CONSIDERED: <option>Similar Majors</option> */}
                </select>
              </div>
            </div>
          </div>
    
          {/* Activity Cards */}
          <div className="space-y-4">
            {activities
            .filter(activity => 
              selectedTags.length === 0 || // Show all if no tag is selected
              selectedTags.some(tag => activity.tags.includes(tag)) // Filter by selected tags
              )
              .map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star size={16} />
                    {activity.matchScore}% Match
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                    {activity.type}
                  </span>
                </div>
    
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{activity.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <MapPin size={16} />
                      {activity.location} ({activity.distance})
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{activity.creator} • {activity.major} • {activity.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{activity.time}</span>
                  </div>
                  <p>{activity.participants}/{activity.spots} spots filled</p>
                </div>
    
                <div className="bg-blue-50 p-3 rounded-lg mb-3 text-sm text-blue-700">
                  <p className="flex items-center gap-1">
                    <Zap size={16} />
                    {activity.aiSuggestion}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {activity.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
    
                <div className="flex justify-between items-center pt-3 border-t">
                  <button className="text-sm text-gray-600 flex items-center gap-1">
                    <MessageCircle size={16} />
                    Chat
                  </button>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-600 px-4 py-1 rounded text-sm">
                      Save
                    </button>
                    <button className="bg-red-600 text-white px-4 py-1 rounded text-sm">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      );
    };
    
    export default MainFeed;