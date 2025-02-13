import json
from pprint import pprint
import os
import time

from dotenv import load_dotenv
from elasticsearch import Elasticsearch

load_dotenv()

#REfer to this document for how to use elastic search: https://www.elastic.co/search-labs/tutorials/search-tutorial/full-text-search/connect-python
class InitalizeElasticsearch:
    def __init__(self):
        self.es = Elasticsearch('https://localhost:9200', basic_auth=('elastic', 'password'),ca_certs='./ca.crt') 
        client_info = self.es.info()
        print('Connected to Elasticsearch!')
        pprint(client_info.body)