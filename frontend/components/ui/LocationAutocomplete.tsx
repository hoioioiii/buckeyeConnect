"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationAutocompleteProps {
  onLocationSelect: (location: string, coordinates: {lat: number, lon: number} | null) => void;
  placeholder?: string;
}

interface Suggestion {
  displayName: string;
  coords: {lat: number, lon: number};
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ 
  onLocationSelect,
  placeholder = "Where is this happening?" 
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the suggestions dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suggestions when input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        // Campus locations for immediate suggestions
        const campusLocations: Record<string, {lat: number, lon: number}> = {
          'Knowlton Hall': { lat: 40.0019, lon: -83.0158 },
          'Thompson Library': { lat: 40.0032, lon: -83.0151 },
          'Ohio Union': { lat: 39.9984, lon: -83.0095 },
          'RPAC': { lat: 39.9999, lon: -83.0190 },
          'Dreese Lab': { lat: 40.0022, lon: -83.0160 },
          'Scott Lab': { lat: 40.0040, lon: -83.0134 },
          'The Oval': { lat: 40.0006, lon: -83.0151 },
          'Ohio Stadium': { lat: 40.0017, lon: -83.0192 },
          'Fisher College of Business': { lat: 40.0032, lon: -83.0107 },
          'OSU Medical Center': { lat: 39.9956, lon: -83.0190 }
        };
        
        // Filter campus locations by input
        const campusMatches = Object.entries(campusLocations)
          .filter(([name]) => name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(([name, coords]) => ({
            displayName: name,
            coords
          }));
        
        // additional suggestions outside specific campus places
        const searchQuery = `${inputValue}, Columbus, Ohio`;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=us&addressdetails=1`);
        
        if (!response.ok) {
          throw new Error('Geocoding API error');
        }
        
        const data = await response.json();
        
        // Only include results that are in Columbus, OH
        const apiSuggestions = data
          .filter((item: any) => {
            const address = item.address || {};
            return (
              (address.city === 'Columbus' || 
               address.county === 'Franklin County' || 
               address.state === 'Ohio') &&
              // Exclude results that are too generic (country, state, etc.)
              item.type !== 'country' && 
              item.type !== 'state'
            );
          })
          .map((item: any) => ({
            displayName: item.display_name,
            coords: { lat: parseFloat(item.lat), lon: parseFloat(item.lon) }
          }));
        
        // Combine and deduplicate suggestions
        const allSuggestions = [...campusMatches, ...apiSuggestions];
        
        setSuggestions(allSuggestions.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(allSuggestions.length > 0);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timeout = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.displayName);
    onLocationSelect(suggestion.displayName, suggestion.coords);
    setShowSuggestions(false);
  };

  // Handle when no matching location is found
  const handleInputBlur = () => {
    // If there are no suggestions and the input is not empty, notify that location wasn't found
    if (suggestions.length === 0 && inputValue.trim().length > 0) {
      setTimeout(() => {
        onLocationSelect(inputValue, null);
      }, 200);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin size={16} className="text-muted-foreground" />
        </span>
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => inputValue.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={handleInputBlur}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-start"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin size={16} className="mr-2 mt-1 text-gray-400 flex-shrink-0" />
                <span className="text-sm">{suggestion.displayName}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No locations found. Try a different search term.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;