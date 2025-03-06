import { Activity_Temp } from "@/lib/types";

const API_BASE_URL = "/api/create";

export interface Response {
  success: boolean;
  error?: string;
}

export async function addActivity(type: Activity_Temp): Promise<Response> {
  try {
    const response = await fetch(`${API_BASE_URL}/add_activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }

    const data: Response = await response.json();
    console.log("Success:", data);
    return { success: true, data: data };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Failed to add activity" };
  }
}
