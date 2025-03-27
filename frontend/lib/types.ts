export type Activity = {
  id: number;
  type: string;
  title: string;
  creator: string;
  major: string;
  year: string;
  time: string;
  location: string;
  coordinates?: { 
    lat: number;
    lon: number;
  };
  distance: string;
  spots: number;
  participants: number;
  matchScore: number;
  tags: string[];
  aiSuggestion: string;
  description: string;
};

export type Activity_Temp = {
  title: string;
  activity_type: string;
  club: string;
  location: string;
  coordinates?: { 
    lat: number;
    lon: number;
  };
  max_spots: number;
  filled_spots: number;
  description: string;
  start_date: string;
  end_date: Date;
  created_on: string;
  created_by: string;
  major: string;
  year: number;
  tags: string[];
  distance: number;
  distance_value: number;
  recurring: {
    enabled: boolean;
  };
};
