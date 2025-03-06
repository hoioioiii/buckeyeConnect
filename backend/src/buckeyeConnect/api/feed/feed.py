from flask import Blueprint, jsonify, request
from ...elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import ConnectionError
import json
from datetime import datetime


#TODO: Note for better matches. doc['_score'] can filter for better matches if needed

# create blue print to zip all the apis corresponding feed into 1 single thing api
# make sure to register in config.py
feed_bp = Blueprint('feed', __name__)

@feed_bp.route('/tags', methods=['GET'])
def get_tags():
    """Get all available tags directly from the tags index"""
    try:
        # Get the Elasticsearch client
        es = get_elasticsearch()
        
        # Check if 'tags' index exists
        if not es.indices.exists(index="tags"):
            print("Tags index does not exist")
            # Try to get tags from activities instead if tags index doesn't exist
            if es.indices.exists(index="activities"):
                result = es.search(
                    index="activities",
                    body={
                        "size": 0,
                        "aggs": {
                            "unique_tags": {
                                "terms": {
                                    "field": "tags.keyword",
                                    "size": 100
                                }
                            }
                        }
                    }
                )
                tags = [bucket['key'] for bucket in result['aggregations']['unique_tags']['buckets']]
                return jsonify({
                    "success": True,
                    "tags": tags
                })
            return jsonify({
                "success": True,
                "tags": []
            })
        
        # Query all tags from the tags index
        result = es.search(
            index="tags",
            body={
                "query": {"match_all": {}},
                "size": 100
            }
        )
        
        # Extract tag names from response
        tags = [doc['_source']['tag_name'] for doc in result['hits']['hits']]
        
        return jsonify({
            "success": True,
            "tags": tags
        })
        
    except Exception as e:
        print(f"Error fetching tags: {e}")
        return jsonify({
            "success": False,
            "error": "Failed to fetch tags from Elasticsearch",
            "tags": []
        })

@feed_bp.route('/activities', methods=['GET'])
def get_activities():
    """Get activities for the main feed with optional filtering"""
    try:
        es = get_elasticsearch()
        
        # Get query parameters
        search_query = request.args.get('q', '')
        distance = request.args.get('distance', '')
        time_filter = request.args.get('time', '')
        major_filter = request.args.get('major', '')
        tags = request.args.getlist('tags')
        
        # # Print received parameters for debugging
        # print(f"Received filters - search: '{search_query}', tags: {tags}, distance: {distance}, time: {time_filter}, major: {major_filter}")
        
        # Build Elasticsearch query
        query = {
            "bool": {
                "must": []
            }
        }
        
        # Add search query if provided
        if search_query:
            query["bool"]["must"].append({
                "multi_match": {
                    "query": search_query,
                    "fields": ["title^3", "description^2", "location", "tags"],
                    "fuzziness": "AUTO",  # Added fuzziness to allow partial word matches
                    "operator": "or"      # Changed to OR to match any word in the query
                }
            })

        if tags and len(tags) > 0:
            print(f"Processing tag filters: {tags}")  # Added for debugging
            
            tag_query = {
                "terms": {
                    "tags": tags  
                }
            }
            
            # Add the tag query to the main query
            query["bool"]["must"].append(tag_query)
            # print(f"Final tag query structure: {json.dumps(tag_query)}")  # Added for debugging


        # Add search query if provided
        if search_query:
            query["bool"]["must"].append({
                "multi_match": {
                    "query": search_query,
                    "fields": ["title^3", "description^2", "location", "tags"],
                    "fuzziness": "AUTO",    # Allow partial matches
                    "operator": "or",       # Match any terms in the query
                    "type": "best_fields"   # Focus on the best matching field
                }
            })


        # Add distance filter if provided
        if distance and distance != 'Any Distance':
            try:
                distance_value = float(distance.split()[1])
                query["bool"]["must"].append({
                    "range": {
                        "distance_value": {
                            "lte": distance_value
                        }
                    }
                })
            except:
                pass  # Skip if parsing fails
        
        # Add time filter if provided
        if time_filter and time_filter != 'Any Time':
            now = datetime.now()
            
            if time_filter == 'Today':
                today = now.strftime('%Y-%m-%d')
                query["bool"]["must"].append({
                    "range": {
                        "start_date": {
                            "gte": today,
                            "lte": today + "T23:59:59"
                        }
                    }
                })
            elif time_filter == 'Tomorrow':
                tomorrow = (now.replace(day=now.day+1)).strftime('%Y-%m-%d')
                query["bool"]["must"].append({
                    "range": {
                        "start_date": {
                            "gte": tomorrow,
                            "lte": tomorrow + "T23:59:59"
                        }
                    }
                })
            elif time_filter == 'This Week':
                week_start = now.strftime('%Y-%m-%d')
                week_end = (now.replace(day=now.day+7)).strftime('%Y-%m-%d')
                query["bool"]["must"].append({
                    "range": {
                        "start_date": {
                            "gte": week_start,
                            "lte": week_end + "T23:59:59"
                        }
                    }
                })
                
        # Add major filter if provided
        if major_filter == 'Same Major':
            user_major = request.args.get('user_major', '')
            if user_major:
                query["bool"]["must"].append({
                    "match": {
                        "major": user_major
                    }
                })
        
        # Print query for debugging
        print("Elasticsearch query:", json.dumps(query, indent=2))
        
        # Execute the search
        result = es.search(
            index="activities",
            body={
                "query": query,
                "sort": [
                    {"_score": {"order": "desc"}},
                    {"start_date": {"order": "asc"}}
                ],
                "size": 50
            }
        )
        
        # Print search result summary
        print(f"Found {result['hits']['total']['value']} activities matching the query")
        
        # Process results
        activities = []
        for hit in result['hits']['hits']:
            activity = hit['_source']
            
            # Calculate match score based on elasticsearch score
            match_score = min(int(hit['_score'] * 10), 100)
            
            # Format the activity data to match frontend expectations
            formatted_activity = {
                "id": hit['_id'],
                "title": activity.get('title', ''),
                "type": activity.get('activity_type', ''),
                "location": activity.get('location', ''),
                "distance": f"{activity.get('distance_value', 0.5)} miles",
                "creator": activity.get('created_by', 'Anonymous'),
                "major": activity.get('major', 'Undecided'),
                "year": activity.get('year', 'Freshman'),
                "time": format_time(activity.get('start_date'), activity.get('end_date')),
                "participants": activity.get('filled_spots', 0),
                "spots": activity.get('max_spots', 10),
                "tags": activity.get('tags', []),
                "matchScore": match_score,
                "aiSuggestion": generate_ai_suggestion(activity, match_score)
            }
            
            activities.append(formatted_activity)
        
        return jsonify({
            "success": True,
            "activities": activities,
            "total": result['hits']['total']['value']
        })
        
    except Exception as e:
        print(f"Error fetching activities: {e}")
        return jsonify({
            "success": False,
            "error": f"Could not retrieve activities: {str(e)}",
            "activities": [],
            "total": 0
        })

def format_time(start_date, end_date):
    """Format the time display for activities"""
    if not start_date:
        return "Time TBD"
        
    try:
        # Parse dates
        start = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        
        # Format start time
        formatted = start.strftime("%a, %b %d at %I:%M %p")
        
        # Add end time if available
        if end_date:
            end = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
            formatted += f" - {end.strftime('%I:%M %p')}"
            
        return formatted
    except:
        return start_date  # Fallback to the raw date string

def generate_ai_suggestion(activity, match_score):
    """Generate an AI suggestion message based on the activity"""
    if match_score > 90:
        return "Perfect match for your interests and schedule!"
    elif match_score > 75:
        return "Great fit based on your activity preferences!"
    elif match_score > 60:
        return "This aligns with your past activities"
    elif "Sports" in activity.get('tags', []):
        return "Good opportunity for physical activity!"
    elif "Free Swag" in activity.get('tags', []):
        return "Free items available at this event!"
    elif "Food" in activity.get('tags', []):
        return "Food will be provided at this event!"
    else:
        return "This might interest you based on campus trends"