from flask import Blueprint, jsonify, request
from ...elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import ConnectionError
import json
from datetime import datetime

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
        print("TETS",data)
        res = es.index(index='activities', body=data)
        return jsonify(res.body)
    except ConnectionError as e:
        return jsonify({'error': 'Elasticsearch connection error'}), 500
    except Exception as e:
        print("this is the error", e)
        return jsonify({'error': str(e)}), 500
    

