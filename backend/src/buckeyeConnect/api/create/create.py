from flask import Blueprint, jsonify, request
from ...elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import ConnectionError
import json
from datetime import datetime
from backend.src.buckeyeConnect.LLM.textProcessing.aiProcessing import text_processing
# create blue print to zip all the apis corresponding feed into 1 single thing api
# make sure to register in config.py
create_bp = Blueprint('create', __name__)



@create_bp.route('/add_activity', methods=['POST'])
def add_activity():
    """
    Add a new activity to the database
    """
    try:
        es = get_elasticsearch()
        data = request.json #get param
        
        if data:
            title = data['title']
            club = data['club']
            description = data['description']
            activity_type = data['activity_type']
            start_time = datetime.strptime(data['start_date'], '%Y-%m-%dT%H:%M:%S')
            end_time = datetime.strptime(data['end_date'], '%Y-%m-%dT%H:%M:%S')

            new_description = f"{title} by {club}. Description: {description}. Activity Type: {activity_type}. Start Time: {start_time}. End Time: {end_time}."
            text_processing = text_processing.get_instance()
            description_embedding, tags = text_processing.generate_description_embedding(new_description)

            data['description_embedding'] = description_embedding
            data['tags'] = tags #tags needs to be a list of strings, so make sure to convert it if necessary


        res = es.index(index='activities', body=data)
        return jsonify(res.body)
    except ConnectionError as e:
        return jsonify({'error': 'Elasticsearch connection error'}), 500
    except Exception as e:
        print("this is the error", e)
        return jsonify({'error': str(e)}), 500
    

