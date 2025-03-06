"use client";
import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Plus, Star, Users, Clock, Zap, MapPin } from 'lucide-react';
import { MOCK_ACTIVITIES } from '@/lib/mock-data';
import { fetchActivities, fetchTags, Activity, FeedFilters } from '@/app/services/feed/api'


const MainFeed = () => {
    const [activeTab, setActiveTab] = useState('activities');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 

    // Activities and tags array to store api response
    const [activities, setActivities] = useState<Activity[]>([]); 
    const [tags, setTags] = useState<string[]>([]); 

    //Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [distanceFilter, setDistanceFilter] = useState('Any Distance');
    const [timeFilter, setTimeFilter] = useState('Any Time');
    const [majorFilter, setMajorFilter] = useState('All Majors');


    // Added useEffect to load data on component mount
    useEffect(() => {
      const loadInitialData = async () => {
          try {
              setLoading(true);
              
              // Fetch tags from API
              const tagsData = await fetchTags();
              setTags(tagsData);
              
              // Fetch initial activities with no filters
              const response = await fetchActivities();
              if (response.success) {
                  setActivities(response.activities);
              } else {
                  setError(response.error || 'Failed to load activities');
              }
          } catch (err) {
              setError('An error occurred while fetching data');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      loadInitialData();
    }, []);


    //  apply filters when they change
    useEffect(() => {
      // Skip if we're still loading initial data
      if (loading && activities.length === 0) {
          return;
      }
      
      const applyFilters = async () => {
          try {
              setLoading(true);
              
              const filters: FeedFilters = {
                  q: searchQuery, 
                  distance: distanceFilter,
                  time: timeFilter,
                  major: majorFilter,
                  tags: selectedTags 
              };
              
              const response = await fetchActivities(filters);
              if (response.success) {
                  setActivities(response.activities);
              } else {
                  setError(response.error || 'Failed to apply filters');
              }
          } catch (err) {
              setError('An error occurred while applying filters');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      // Debounce to avoid too many requests
      const timeoutId = setTimeout(() => {
          applyFilters();
      }, 500);

      return () => clearTimeout(timeoutId);
    }, [searchQuery, distanceFilter, timeFilter, majorFilter, selectedTags]);
    
    // Simplified tag toggle function
    const toggleTag = (tag: string) => {      
      if (selectedTags.includes(tag)) {
        // Remove tag
        const newTags = selectedTags.filter(t => t !== tag);
        setSelectedTags(newTags);
      } else {
        // Add tag
        const newTags = [...selectedTags, tag];
        setSelectedTags(newTags);
      }
    };

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
    
            {/* Tag Filtering */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => toggleTag(tag)} // toggle tag filter
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} //  apply search filter
                />
                <Search className="absolute right-4 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-3 text-sm">
                <select 
                  className="border rounded p-2"
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value)}
                >
                  <option>Any Distance</option>
                  <option>Within 0.5 miles</option>
                  <option>Within 1 mile</option>
                </select>
                <select 
                  className="border rounded p-2"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option>Any Time</option>
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                </select>
                <select 
                  className="border rounded p-2"
                  value={majorFilter}
                  onChange={(e) => setMajorFilter(e.target.value)}
                >
                  <option>All Majors</option>
                  <option>Same Major</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* loading state */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-2"></div>
              <p>Loading activities...</p>
            </div>
          )}

          {/*  error state */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center my-4">
              <p>{error}</p>
              <button 
                className="mt-2 text-sm text-white bg-red-600 px-4 py-1 rounded"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}
    
          {/* Activity Cards */}
          {!loading && !error && (
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <p className="text-gray-600">No activities found matching your criteria.</p>
                </div>
              ) : (
                activities.map((activity) => (
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
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          onClick={() => !selectedTags.includes(tag) && toggleTag(tag)} // This adds the tag to selected filters
                          style={{ cursor: 'pointer' }}
                        >
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
                ))
              )}
            </div>
          )}
        </div>
      );
    };
    
    
    export default MainFeed;