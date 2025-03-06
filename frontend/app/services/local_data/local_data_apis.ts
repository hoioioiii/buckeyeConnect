import { ELASTICSEARCH_CONSTANTS } from "@/lib/constants";

const API_BASE_URL = "/api/local_data";

export interface LocalDataResponse {
  success: boolean;
  data: string[];
  error?: string;
}

export interface LocalDataResponsePattern {
  success: boolean;
  data: {
    recurrences_pattern: string[];
    duration_minutes: string[];
    ending_pattern: string[];
    days_enabled: string[];
  };
  error?: string;
}

const errorData = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return {
    success: false,
    data: [],
    error: errorMessage,
  };
};

const errorDataPattern = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return {
    success: false,
    data: {
      recurrences_pattern: [],
      duration_minutes: [],
      ending_pattern: [],
      days_enabled: [],
    },
    error: errorMessage,
  };
};

export async function getActivityTypeList() {
  try {
    const response = await fetch(`${API_BASE_URL}/activity_type`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }

    const data: LocalDataResponse = await response.json();
    console.log("Success:", data.data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return errorData(error);
  }
}

export async function getClubTypeList() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${ELASTICSEARCH_CONSTANTS.CLUB_TYPES}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }

    const data: LocalDataResponse = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return errorData(error);
  }
}

export async function getRecurrancePatternTypeList(type: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${
        ELASTICSEARCH_CONSTANTS.RECURRENCES_PATTERN
      }?type=${encodeURIComponent(type)}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.status);
    }

    const data: LocalDataResponsePattern = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return errorDataPattern(error);
  }
}
