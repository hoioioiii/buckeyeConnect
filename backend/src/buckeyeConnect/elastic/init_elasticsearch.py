import json
import time
from .connection.connection import *
import os
import sys
from .mapping.mapping import *
from .data.preexistingData import *
# Sample data for activities
sample_activities = [
    {
        "id": "1",
        "title": "Neuroscience Research MRI Study",
        "activity_type": "Research",
        "location": "OSU Medical Center",
        "coordinates": {
            "lat": 39.9959,
            "lon": -83.0171
        },
        "max_spots": 5,
        "filled_spots": 2,
        "description": "Participate in a 1-hour MRI study. Compensation provided.",
        "start_date": "2025-03-06T09:00:00",
        "end_date": "2025-03-06T10:00:00",
        "created_on": "2025-03-01T10:15:00",
        "created_by": "Dr. Smith",
        "major": "Neuroscience",
        "year": "Faculty",
        "tags": ["Research", "Neuroscience", "Paid", "MRI Study", "Volunteering"],
        "distance": "0.8 miles",
        "distance_value": 0.8,
        "recurring": {
            "enabled": False
        }
    },
    {
        "id": "2",
        "title": "AI Club Weekly Meeting",
        "activity_type": "Club Meeting",
        "location": "Knowlton Hall 250",
        "coordinates": {
            "lat": 40.0023,
            "lon": -83.0155
        },
        "max_spots": 50,
        "filled_spots": 20,
        "description": "Join us for a discussion on deep learning and AI trends.",
        "start_date": "2025-03-05T18:00:00",
        "end_date": "2025-03-05T19:30:00",
        "created_on": "2025-03-01T09:30:00",
        "created_by": "AI Club President",
        "major": "Computer Science",
        "year": "All",
        "tags": ["AI", "Tech", "Networking", "Club Meeting"],
        "distance": "0.3 miles",
        "distance_value": 0.3,
        "recurring": {
            "enabled": True,
            "pattern": "weekly",
            "days_enabled": ["Wednesday"]
        }
    },
    {
        "id": "5",
        "title": "CSE 2421 Study Session",
        "activity_type": "Study Group",
        "location": "Thompson Library 2nd Floor",
        "coordinates": {
            "lat": 39.9996,
            "lon": -83.0132
        },
        "max_spots": 10,
        "filled_spots": 5,
        "description": "Join our study session to review concepts and solve problems together.",
        "start_date": "2025-03-05T19:00:00",
        "end_date": "2025-03-05T21:00:00",
        "created_on": "2025-03-02T14:30:00",
        "created_by": "John Doe",
        "major": "Computer Science",
        "year": "Sophomore",
        "tags": ["Study", "Computer Science", "Midterms"],
        "distance": "0.0 miles",
        "distance_value": 0.0,
        "recurring": {
            "enabled": False
        }
    },
    {
        "id": "4",
        "title": "Google Swag Giveaway",
        "activity_type": "Free Swag",
        "location": "Ohio Union",
        "coordinates": {
            "lat": 39.9976,
            "lon": -83.0084
        },
        "max_spots": 100,
        "filled_spots": 40,
        "description": "Stop by to grab free Google swag and learn about career opportunities!",
        "start_date": "2025-03-06T12:00:00",
        "end_date": "2025-03-06T14:00:00",
        "created_on": "2025-03-01T11:15:00",
        "created_by": "Google Student Ambassadors",
        "major": "All Majors",
        "year": "All",
        "tags": ["Tech", "Networking", "Free Swag"],
        "distance": "0.1 miles",
        "distance_value": 0.1,
        "recurring": {
            "enabled": False
        }
    },
    {
        "id": "6",
        "title": "Women in STEM Networking Night",
        "activity_type": "Networking",
        "location": "Scott Lab 100",
        "coordinates": {
            "lat": 40.0026,
            "lon": -83.0150
        },
        "max_spots": 30,
        "filled_spots": 15,
        "description": "Network with successful women in STEM fields and gain career advice.",
        "start_date": "2025-03-08T18:30:00",
        "end_date": "2025-03-08T20:30:00",
        "created_on": "2025-03-02T09:00:00",
        "created_by": "WiSTEM OSU",
        "major": "All STEM Majors",
        "year": "All",
        "tags": ["STEM", "Women in Tech", "Networking"],
        "distance": "0.7 miles",
        "distance_value": 0.7,
        "recurring": {
            "enabled": False
        }
    }
]

# Sample tags
sample_tags = [
    {"tag_name": "Research", "category": "Academic"},
    {"tag_name": "Sports", "category": "Recreation"},
    {"tag_name": "Club Meeting", "category": "Organizations"},
    {"tag_name": "Food", "category": "Social"},
    {"tag_name": "Study", "category": "Academic"},
    {"tag_name": "Volunteering", "category": "Service"},
    {"tag_name": "Gaming", "category": "Recreation"},
    {"tag_name": "Fitness", "category": "Health"},
    {"tag_name": "Free Swag", "category": "Perks"},
    {"tag_name": "Networking", "category": "Career"},
    {"tag_name": "Social", "category": "Social"},
    {"tag_name": "Tech", "category": "Interest"}
]


def initialize_elasticsearch():
    """
    Initialize Elasticsearch with our indices and mappings
    """
    try:
        # Connect to Elasticsearch
        es = get_elasticsearch()
        print("Connected to Elasticsearch!")



        ##### THIS IS FOR MY OWN DEBUGGING#############################
        #TODO: DELETE THIS CHUNK WITHIN ###
        # Delete existing indices if they exist
        print("Checking for existing indices to delete...")
        
        # Check and delete activities index
        if es.indices.exists(index="activities"):
            print("Deleting existing activities index...")
            es.indices.delete(index="activities")
            print("Activities index deleted.")
            
        # Check and delete users index
        if es.indices.exists(index="users"):
            print("Deleting existing users index...")
            es.indices.delete(index="users")
            print("Users index deleted.")
            
        # Check and delete tags index
        if es.indices.exists(index="tags"):
            print("Deleting existing tags index...")
            es.indices.delete(index="tags")
            print("Tags index deleted.")


        # Check and delete activity type index
        if es.indices.exists(index="activity_types"):
            print("Deleting existing activity type index...")
            es.indices.delete(index="activity_types")
            print("Activity type index deleted.")
        
        # Check and delete club index
        if es.indices.exists(index="club"):
            print("Deleting existing club index...")
            es.indices.delete(index="club")
            print("Club index deleted.")
        
        # Check and delete recurrences pattern index
        if es.indices.exists(index="recurrences_pattern"):
            print("Deleting existing recurrences pattern index...")
            es.indices.delete(index="recurrences_pattern")
            print("Recurrences pattern index deleted.")
        
        ########################################################


        
        # Create activities index
        if not es.indices.exists(index="activities"):
            print("Creating activities index...")
            es.indices.create(index="activities", body=activity_mapping)
            print("Activities index created!")
            
            # Load sample activity data
            print("Loading sample activities...")
            for i, activity in enumerate(sample_activities):
                es.index(index="activities", id=i+1, body=activity)
            print(f"Loaded {len(sample_activities)} sample activities!")
        else:
            print("Activities index already exists.")
        
        # Create users index
        if not es.indices.exists(index="users"):
            print("Creating users index...")
            es.indices.create(index="users", body=user_mapping)
            print("Users index created!")
        else:
            print("Users index already exists.")
        
        # Create tags index
        if not es.indices.exists(index="tags"):
            print("Creating tags index...")
            es.indices.create(index="tags", body=predefined_tags)
            print("Tags index created!")
            
            # Load sample tags
            print("Loading sample tags...")
            for i, tag in enumerate(sample_tags):
                es.index(index="tags", id=i+1, body=tag)
            print(f"Loaded {len(sample_tags)} sample tags!")
        else:
            print("Tags index already exists.")
        

        # create activity type index
        if not es.indices.exists(index="activity_types"):
            print("Creating activity type index...")
            es.indices.create(index="activity_types", body=activity_type_mapping)
            print("Activity type index created!")

             # Load sample activity type data
            print("Loading activity types ...")
            for i, type in enumerate(local_activity_type_data):
                es.index(index="activity_types", id=i+1, body=type)
            print(f"Loaded {len(type)} activity types!")
        else:
            print("Activity type index already exists.")

        # create club type index
        if not es.indices.exists(index="club"):
            print("Creating club index...")
            es.indices.create(index="club", body=club_mapping)
            print("Club index created!")

            print("Loading club types ...")
            for i, clubs in enumerate(local_club_type_data):
                es.index(index="club", id=i+1, body=clubs)
            print(f"Loaded {len(clubs)} club types!")


        else:
            print("Club index already exists.")

        # create recurrences pattern index
        if not es.indices.exists(index="recurrences_pattern"):
            print("Creating recurrences pattern index...")
            es.indices.create(index="recurrences_pattern", body=recurrences_pattern_mapping)
            print("Recurrences pattern index created!")


            print("Loading recurring types ...")
            for i, pattern in enumerate(local_recurrences_pattern_data):
                es.index(index="recurrences_pattern", id=i+1, body=pattern)
            print(f"Loaded {len(pattern)} pattern!")
        else:
            print("Recurrences pattern index already exists.")

        # Force refresh to make sure the data is available for search
        es.indices.refresh(index="_all")
        
        print("Elasticsearch initialization complete!")
        

        # THIS IS FOR TESTING IF WHATEVER TAG IS STORED IN ELASTIC###############
        try:
            print("Testing search functionality...")
            response = es.search(
                index="club", 
                body={"query": {"match_all": {}}},
                size=100
            )
            
            # Check if there are hits (documents)
            if response['hits']['total']['value'] > 0:
                print(f"Found {response['hits']['total']['value']} documents in Elasticsearch")
                
                for doc in response['hits']['hits']:
                    tag_name = doc['_source'].get('club_names')
                    
                    #category = doc['_source'].get('category', 'No category')
                    print(f"Tag: {tag_name}")
            else:
                print("No documents found in Elasticsearch, but connection is working")
            
            # Return success even if no documents, as long as the query worked
            return True
            
        except Exception as search_error:
            print(f"Search test failed: {search_error}")
            # Still return True because initialization succeeded
            # The search might fail for reasons other than initialization problems
            return True
        ###########################################################################
        
        return True
        
    except Exception as e:
        print(f"Error initializing Elasticsearch: {str(e)}")
        return False