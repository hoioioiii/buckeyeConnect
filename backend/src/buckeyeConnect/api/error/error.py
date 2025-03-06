from flask import jsonify

from ...util.ElasticSearchConstants import ElasticsearchConstants


def error_elasticsearch_failed(type: str, e: Exception):
    print(f"Error fetching {type}: {e}")
    
    if type == ElasticsearchConstants.PRE_DEFINED_EMPTY:
        return jsonify({
            "success": False,
            "error": "Pre-defined data not found",
            type: []
        }), 404


    return jsonify({
            "success": False,
            "error": "Failed to fetch {type} from Elasticsearch",
            type: []
    }),500

