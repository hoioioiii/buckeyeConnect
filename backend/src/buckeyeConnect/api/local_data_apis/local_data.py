"""
This api is used to get different types of pre-existing data from the backend

"""

from flask import Blueprint, jsonify, request
from ...elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import ConnectionError
import json
from ..error.error import error_elasticsearch_failed
from ...util.ElasticSearchConstants import ElasticsearchConstants

local_data_bp = Blueprint('local_data', __name__)


@local_data_bp.route('/local_data/activity_type', methods=['GET'])
def get_activity_types():
    """
    This api is used to get all the activity types
    """
    try:
        es = get_elasticsearch()
        response = es.search(
            index='activity_type',
            body={
                "query": {"match_all": {}},
                "size": 100
                }
        )
        
        activity_types = [doc['_source']['activity_type'] for doc in response['hits']['hits']]
        
        if not activity_types:
            return error_elasticsearch_failed(ElasticsearchConstants.PRE_DEFINED_EMPTY, None)
        
        return jsonify({
            "success": True,
            "activity_types": activity_types
        })
    
    
    except ConnectionError as e:
        return error_elasticsearch_failed(ElasticsearchConstants.ACTIVITY_TYPES, e)


@local_data_bp.route('/local_data/club', methods=['GET'])
def get_clubs():
    """
    This api is used to get all the clubs
    """
    try:
        es = get_elasticsearch()
        response = es.search(
            index='club',
            body={
                "query": {"match_all": {}},
                "size": 100
                }
        )
        clubs = [doc['_source']['club_names'] for doc in response['hits']['hits']]
        
        if not clubs:
            return error_elasticsearch_failed(ElasticsearchConstants.PRE_DEFINED_EMPTY, None)
        

        return jsonify({
            "success": True,
            "clubs": clubs
        })
    except ConnectionError as e:
        return error_elasticsearch_failed(ElasticsearchConstants.CLUB, e)

@local_data_bp.route('/local_data/recurrences_pattern', methods=['GET'])
def get_recurrences_pattern(type : str):
    """
    This api is used to get all the recurrences pattern
    """
    try:
        es = get_elasticsearch()
        response = es.search(
            index='recurrences_pattern',
            body={
                "size": 1,
                "_source": [type]  #allows us to just query for the field we want
                }
        )
        
        recurrences_pattern_type = [doc['_source'][type] for doc in response['hits']['hits']]
        if not recurrences_pattern_type:
            return error_elasticsearch_failed(ElasticsearchConstants.PRE_DEFINED_EMPTY, None)
        
        return jsonify({
            "success": True,
            type: recurrences_pattern_type
        })
        
    except ConnectionError as e:
        return error_elasticsearch_failed(type, e)