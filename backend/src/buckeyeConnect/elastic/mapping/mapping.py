activity_mapping = {
    "mappings": {
        "properties": {
            "activity_type": {
                "type": "keyword"
            },
            "club_name": {
                "type": "text"
            },
            "major": {
                "type": "keyword"
            },
            "location": {
                "type": "text"
            },
            "max_spots": {
                "type": "integer"
            },
            "title": {
                "type": "text"
            },
            "description": {
                "type": "text"
            },
            "start_date": {
                "type": "date",
                "format": "date_optional_time||strict_date_optional_time"
            },
            "end_date": {
                "type": "date",
                "format": "date_optional_time||strict_date_optional_time"
            },
            "created_on": {
                "type": "date",
                "format": "date_optional_time||strict_date_optional_time"
            },
            "created_by": {
                "type": "keyword"
            },
            "filled_spots": {
                "type": "integer"
            },
            "tags": {
                "type": "keyword"
            },
            "distance_value": {
                "type": "float"
            },
            "year": {
                "type": "keyword"
            },
            "recurring": {
                "properties": {
                    "enabled": {
                        "type": "boolean"
                    },
                    "pattern": {
                        "type": "keyword"
                    },
                    "start_date_recurring": {
                        "type": "date",
                        "format": "date_optional_time||strict_date_optional_time"
                    },
                    "end_date_recurring": {
                        "type": "date",
                        "format": "date_optional_time||strict_date_optional_time"
                    },
                    "days_enabled": {
                        "type": "keyword"
                    },
                }
            },
        },
    }
}

user_mapping = {
    "mappings": {
        "properties": {
            "name": {
                "type": "text"
            },
            "email": {
                "type": "keyword"
            },
            "major": {
                "type": "keyword"
            },
            "year": {
                "type": "keyword"
            },
            "bio": {
                "type": "text"
            },
            "tags": {
                "type": "keyword"
            },
            "enable_location": {
                "type": "boolean"
            },
        },
    }
}


"""
Predefined data mappings

"""

predefined_tags = {
    "mappings": {
        "properties": {
            "tag_name": {
                "type": "keyword"
            },
            "category": {
                "type": "keyword"
            },
        },
    }
}



activity_type_mapping = {
  "mappings": {
    "properties": {
      "activity_type": {
        "type": "text",
      },
    },
  },
}

club_mapping = {
  "mappings": {
    "properties": {
      "club_names": {
        "type": "text",
      },
    },
  },
}

recurrences_pattern_mapping = {
  "mappings": {
    "properties": {
      "recurrences_pattern": {
        "type": "keyword",
      },
      "duration_minutes": {
        "type": "keyword",
      },
      "ending_pattern": {
        "type": "keyword",
      },
      "days_enabled": {
        "type": "keyword",
      },
    },
  },
}