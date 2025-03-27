export async function geocodeLocation(locationName: string): Promise<{lat: number, lon: number} | null> {
    try {
      // First, check common campus locations to avoid unnecessary API calls
      const campusLocations: Record<string, {lat: number, lon: number}> = {
        'knowlton hall': { lat: 40.0019, lon: -83.0158 },
        'thompson library': { lat: 40.0032, lon: -83.0151 },
        'ohio union': { lat: 39.9984, lon: -83.0095 },
        'rpac': { lat: 39.9999, lon: -83.0190 },
        'dreese lab': { lat: 40.0022, lon: -83.0160 },
        'scott lab': { lat: 40.0040, lon: -83.0134 },
        'osu medical center': { lat: 39.9956, lon: -83.0190 }
      };
      
      // Check for match in campus locations (case insensitive)
      const normalizedInput = locationName.toLowerCase().trim();
      for (const [building, coords] of Object.entries(campusLocations)) {
        if (normalizedInput.includes(building.toLowerCase()) || 
            building.toLowerCase().includes(normalizedInput)) {
          return coords;
        }
      }
      
      // Try to handle address format for Columbus addresses
      let searchQuery = locationName;
      
      // If it looks like an address but doesn't specify Columbus/Ohio, add that context
      if (/\d+\s+\w+/.test(locationName) && // Contains numbers followed by text (likely an address)
          !locationName.toLowerCase().includes('columbus') && 
          !locationName.toLowerCase().includes('ohio')) {
        searchQuery = `${locationName}, Columbus, OH`;
      }
      
      // Use Nominatim geocoding service
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=1`);
      
      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if we got results
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
      
      // If no results for the original query, try adding more context
      if (!searchQuery.toLowerCase().includes('columbus')) {
        // Try with Columbus, Ohio context
        const backupQuery = `${locationName}, Columbus, Ohio`;
        const backupResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(backupQuery)}&limit=1`);
        
        if (backupResponse.ok) {
          const backupData = await backupResponse.json();
          if (backupData && backupData.length > 0) {
            return {
              lat: parseFloat(backupData[0].lat),
              lon: parseFloat(backupData[0].lon)
            };
          }
        }
      }
      
      // No results found
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }

  export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
