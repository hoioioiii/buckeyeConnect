export const activityMapping = {
  mappings: {
    properties: {
      activity_type: {
        type: "text",
      },
      club_name: {
        // TODO: up to change
        type: "text",
      },
      major: {
        type: "text",
      },
      location: {
        type: "text",
      },
      max_spots: {
        type: "integer", // TODDO: error
      },
      title: {
        type: "text",
      },
      description: {
        type: "text",
      },
      start_date: {
        type: "date",
        format: "MM/dd/yyyy",
      },
      end_date: {
        type: "date",
        format: "MM/dd/yyyy",
      },
      created_on: {
        type: "date",
        format: "MM/dd/yyyy",
      },
      created_by: {
        type: "text", // TODO: id or name, how we differentiating users
      },
      filled_spots: {
        type: "integer",
      },
      tags: {
        type: "keyword",
      },
      recurring: {
        properties: {
          enabled: {
            type: "boolean",
          },
          pattern: {
            // weekly
            type: "text",
          },
          start_date_recurring: {
            type: "date",
            format: "MM/dd/yyyy",
          },
          end_date_recurring: {
            type: "date",
            format: "MM/dd/yyyy",
          },
          days_enabled: {
            type: "keyword", // ["Monday", "Wednesday", "Friday"]
          },
        },
      },
    },
  },
};

export const userMapping = {
  mappings: {
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string", // TODO: how to make unique??
      },
      major: {
        type: "string",
      },
      year: {
        type: "integer",
      },
      bio: {
        type: "string",
      },
      tags: {
        type: "keyword",
      },
      enable_location: {
        type: "boolean", // TODO: maybe error
      },
    },
  },
};

export const predefined_tags = {
  mappings: {
    properties: {
      tag_name: {
        type: "string",
      },
      category: {
        type: "keyword",
      },
    },
  },
};

// Nice to have feature
// export const findFriendsMapping = {
//     "mappings": {
//         "properties": {

//         },
//     }
// }

/***********************************************
 *
 * 2 Types of data: Preexisting and User created
 *
 **********************************************/

// Preexisting:
activity_type_mapping = {
  mappings: {
    properties: {
      activity_type: {
        type: "keyword",
      },
    },
  },
};

club_mapping = {
  mappings: {
    properties: {
      club_names: {
        type: "keyword",
      },
    },
  },
};

reoccurance_pattern_mapping = {
  mappings: {
    properties: {
      reoccurance_pattern: {
        type: "keyword",
      },
      duration_minutes: {
        type: "keyword",
      },
      ending_pattern: {
        type: "keyword",
      },
      days_enabled: {
        type: "keyword",
      },
    },
  },
};

//Populating Data

//Create the instances of all preexisting data
