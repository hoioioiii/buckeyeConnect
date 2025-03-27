export interface Activity {
  id: string;
  title: string;
  type: string;
  location: string;
  coordinates?: { 
    lat: number;
    lon: number;
  };
  distance: string;
  creator: string;
  major: string;
  year: string;
  time: string;
  participants: number;
  spots: number;
  tags: string[];
  matchScore: number;
  aiSuggestion: string;
}

export interface FeedResponse {
  success: boolean;
  activities: Activity[];
  total: number;
  error?: string;
}

export interface TagsResponse {
  success: boolean;
  tags: string[];
  error?: string;
}

export interface FeedFilters {
  q?: string;
  distance?: string;
  time?: string;
  major?: string;
  tags?: string[];
  latitude?: number;  // Add these fields
  longitude?: number;
}

// Using relative URLs that will be handled by Next.js proxy
const API_BASE_URL = "/api/feed";

export const fetchActivities = async (
  filters: FeedFilters = {}
): Promise<FeedResponse> => {
  try {
    // Build query params
    const params = new URLSearchParams();

    if (filters.q) params.append("q", filters.q);
    if (filters.distance && filters.distance !== "Any Distance")
      params.append("distance", filters.distance);
    if (filters.time && filters.time !== "Any Time")
      params.append("time", filters.time);
    if (filters.major && filters.major !== "All Majors")
      params.append("major", filters.major);

    // Handle multiple tags
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach((tag) => params.append("tags", tag));
    }

    if (filters.latitude) params.append("latitude", filters.latitude.toString());
    if (filters.longitude) params.append("longitude", filters.longitude.toString());

    console.log(
      `Fetching activities from: ${API_BASE_URL}/activities?${params.toString()}`
    );

    const response = await fetch(
      `${API_BASE_URL}/activities?${params.toString()}`
    );
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Body: ${errorText}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Activities API response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("Network error - server might be down or unreachable");
    }

    return {
      success: false,
      activities: [],
      total: 0,
      error: "Failed to fetch activities from server. Is the backend running?",
    };
  }
};

export const fetchTags = async (): Promise<string[]> => {
  try {
    console.log(`Fetching tags from: ${API_BASE_URL}/tags`);

    const response = await fetch(`${API_BASE_URL}/tags`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Body: ${errorText}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TagsResponse = await response.json();
    console.log("Tags API response:", data);

    return data.success && data.tags ? data.tags : [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    // Provide more helpful error information in the console
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("Network error - server might be down or unreachable");
    }
    return [];
  }
};
