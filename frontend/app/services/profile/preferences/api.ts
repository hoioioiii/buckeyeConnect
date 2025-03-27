export interface UserPreferences {
    distance_preference: string;
    match_same_major: boolean;
    match_same_year: boolean;
    match_schedule: boolean;
    show_profile: boolean;
    show_schedule: boolean;
  }
  
  const API_BASE_URL = "/api/preferences";
  
  export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        credentials: "include",
      });
  
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return null;
      }
  
      const data = await response.json();
      return data.success ? data.preferences : null;
    } catch (err) {
      console.error("api.ts: Failed to fetch user preferences", err);
      return null;
    }
  };
  
  export const updateUserPreferences = async (
    userId: string,
    updates: Partial<UserPreferences>
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
  
      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error("api.ts: Failed to update user preferences", err);
      return false;
    }
  };
  