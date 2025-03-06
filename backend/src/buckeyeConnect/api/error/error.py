from flask import jsonify

from ...util.ElasticSearchConstants import ElasticsearchConstants


def error_elasticsearch_failed(type: any, e: Exception):
    print(f"Error fetching {type}: {e}")
    
    # if type == ElasticsearchConstants.PRE_DEFINED_EMPTY:
    #     return jsonify({
    #         "success": False,
    #         "error": "Pre-defined data not found",
    #         str(type): []
    #     }), 404


    return jsonify({
            "success": False,
            "error": "Failed to fetch {type} from Elasticsearch",
            str(type): []
    }),500

