# routes/user_preferences.py
from flask import Blueprint, jsonify, request
from ....elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import NotFoundError

preferences_bp = Blueprint('preferences', __name__)

@preferences_bp.route('/<user_id>', methods=['GET'])
def get_user_preferences(user_id):
    es = get_elasticsearch()
    try:
        result = es.get(index='users_preferences', id=user_id)
        return jsonify({"success": True, "preferences": result['_source']['doc']})
    except NotFoundError:
        return jsonify({"success": True, "preferences": {}})
    except Exception as e:
        print(f"Error fetching user preferences: {e}")
        return jsonify({"success": False, "error": "Preferences not found"}), 404

@preferences_bp.route('/<user_id>', methods=['PUT'])
def update_user_preferences(user_id):
    es = get_elasticsearch()
    data = request.json
    allowed_fields = [
        "distance_preference",
        "match_same_major",
        "match_same_year",
        "match_schedule",
        "show_profile",
        "show_schedule",
    ]
    update_data = {key: data[key] for key in allowed_fields if key in data}

    try:
        es.index(index='users_preferences', id=user_id, body={"doc": update_data})
        return jsonify({"success": True})
    except Exception as e:
        print(f"Error updating user preferences: {e}")
        return jsonify({"success": False, "error": "Failed to update preferences"}), 500
