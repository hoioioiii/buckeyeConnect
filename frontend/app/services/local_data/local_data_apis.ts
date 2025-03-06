import { ELASTICSEARCH_CONSTANTS } from "@/lib/constants";

const API_BASE_URL = "/api/local_data";

export interface LocalDataResponse {
  success: boolean;
  data: string[];
  error?: string;
}

const errorData = (error: unknown): LocalDataResponse => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return {
    success: false,
    data: [],
    error: errorMessage,
  };
};

export async function getActivityTypeList(): Promise<
  LocalDataResponse | undefined
> {
  try {
    const response = await fetch(
      API_BASE_URL + "/" + ELASTICSEARCH_CONSTANTS.ACTIVITY_TYPE
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

export async function getClubTypeList(): Promise<
  LocalDataResponse | undefined
> {
  try {
    const response = await fetch(
      API_BASE_URL + "/" + ELASTICSEARCH_CONSTANTS.CLUB_TYPES
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

export async function getRecurrancePatternTypeList(
  type: string
): Promise<LocalDataResponse | undefined> {
  try {
    const response = await fetch(
      API_BASE_URL +
        "/" +
        ELASTICSEARCH_CONSTANTS.RECURRENCES_PATTERN +
        "?type=" +
        encodeURIComponent(type)
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
