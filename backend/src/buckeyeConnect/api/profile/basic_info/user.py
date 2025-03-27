# routes/user.py
from flask import Blueprint, jsonify, request
from ....elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import NotFoundError

user_bp = Blueprint('user', __name__)

@user_bp.route('/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    es = get_elasticsearch()
    try:
        result = es.get(index='users', id=user_id)
        print(result)
        return jsonify({"success": True, "user": result['_source']['doc']})
    except NotFoundError:
        return jsonify({"success": True, "user": {}})
    except Exception as e:
        print(f"Error fetching user: {e}")
        return jsonify({"success": False, "error": "User not found"}), 404

@user_bp.route('/<user_id>', methods=['PUT'])
def update_user_profile(user_id):
    es = get_elasticsearch()
    data = request.json 
    print(data)
    # Only update allowed fields
    allowed_fields = ['name', 'major', 'year', 'bio', 'enable_location']
    update_data = {key: data[key] for key in allowed_fields if key in data}
    print(update_data)
    try:
        es.index(index='users', id=user_id, body={"doc": update_data})
        return jsonify({"success": True})
    except Exception as e:
        print(f"Error updating user: {e}")
        return jsonify({"success": False, "error": "Failed to update user"}), 500