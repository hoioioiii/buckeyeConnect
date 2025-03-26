export interface UserProfile {
  name: string;
  email: string;
  major: string;
  year: string;
  bio: string;
  tags: string[];
  enable_location: boolean;
}
const API_BASE_URL = "/api/user";

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
 
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      credentials: 'include', // ensure cookies (JWT token) are sent
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.success ? data.user : null;

  } catch (err) {
    console.error("api.ts: Failed to fetch user profile", err);
    return null;
  }
};


export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error("api.ts: Failed to update user profile", err);
    return false;
  }
};
