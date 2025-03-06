export const activityMapping = {
    "mappings": {
        "properties": {
            "activity_type": {
                "type": "string"
            },
            "club_name": { // TODO: up to change
                "type": "string"
            },
            "major": {
                "type": "string"
            },
            "location": {
                "type": "string"
            },
            "max_spots": {
                "type": "integer" // TODDO: error
            },
            "title": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "start_date": {
                "type": "date",
                "format": "MM/dd/yyyy"
            },
            "end_date": {
                "type": "date",
                "format": "MM/dd/yyyy"
            },
            "created_on": {
                "type": "date",
                "format": "MM/dd/yyyy"
            },
            "created_by": {
                "type": "string" // TODO: id or name, how we differentiating users
            },
            "filled_spots": {
                "type": "integer"
            },
            "tags": {
                "type": "keyword"
            },
            "recurring": {
                "properties": {
                    "enabled": {
                        "type": "boolean"
                    },
                    "pattern": { // weekly
                        "type": "string"
                    },
                    "start_date_recurring": {
                        "type": "date",
                        "format": "MM/dd/yyyy"
                    },
                    "end_date_recurring": {
                        "type": "date",
                        "format": "MM/dd/yyyy"
                    },
                    "days_enabled": {
                        "type": "keyword" // ["Monday", "Wednesday", "Friday"]
                    },
                }
            },
        },
    }
}

export const userMapping = {
    "mappings": {
        "properties": {
            "name": {
                "type": "string"
            },
            "email": {
                "type": "string" // TODO: how to make unique??
            },
            "major": {
                "type": "string"
            },
            "year": {
                "type": "integer"
            },
            "bio": {
                "type": "string"
            },
            "tags": {
                "type": "keyword"
            },
            "enable_location": {
                "type": "boolean" // TODO: maybe error
            },
        },
    }
}

export const predefined_tags = {
    "mappings": {
        "properties": {
            "tag_name": {
                "type": "string"
            },
            "category": {
                "type": "keyword"
            },
        },
    }
}

// Nice to have feature
// export const findFriendsMapping = {
//     "mappings": {
//         "properties": {
            
//         },
//     }
// }