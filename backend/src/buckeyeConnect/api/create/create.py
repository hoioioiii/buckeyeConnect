from flask import Blueprint, jsonify, request
from ...elastic.connection.connection import get_elasticsearch
from elasticsearch.exceptions import ConnectionError
import json
from datetime import datetime

# create blue print to zip all the apis corresponding feed into 1 single thing api
# make sure to register in config.py
create_bp = Blueprint('create', __name__)


