import json
from pprint import pprint
import os
import time
from pathlib import Path
import ssl

from dotenv import load_dotenv
from elasticsearch import Elasticsearch

es_client = None

load_dotenv()

class InitializeElasticsearch:
    def __init__(self):
        try:
            # Get the path to the current file
            current_file = Path(__file__).resolve()
            backend_dir = current_file.parent.parent.parent.parent.parent

            # IF IT FAILS :  MODIFY THE PATH TO THE CERTIFICATE TO WHERE YOUR PATH IS
            # Construct the path to the certificate
            cert_path = backend_dir / 'ca.crt'
            print(f"Looking for certificate at: {cert_path}")
            
            # Check both potential locations for the certificate
            if not cert_path.exists():
                # Try alternative location
                alt_cert_path = backend_dir / 'ca.crt'
                print(f"Certificate not found at {cert_path}, trying {alt_cert_path}")
                if alt_cert_path.exists():
                    cert_path = alt_cert_path
                else:
                    # If we can't find it, try connecting without SSL verification in development
                    print("Warning: Certificate file not found. Attempting to connect without certificate.")
                    context = ssl.create_default_context()
                    context.check_hostname = False
                    context.verify_mode = ssl.CERT_NONE
                    
                    self.es = Elasticsearch(
                        'https://localhost:9200',
                        basic_auth=('elastic', 'password'),
                        ssl_context=context,
                        timeout=30,
                        retry_on_timeout=True,
                        max_retries=3
                    )
                    
                    # Verify connection
                    client_info = self.es.info()
                    print('Connected to Elasticsearch without certificate verification!')
                    pprint(client_info.body)
                    return
            
            print(f"Using certificate at: {cert_path}")

            ctx = ssl.create_default_context()
            ctx.load_verify_locations(str(cert_path))
            # Disable strict SSL verification to fix errors on Python 3.13
            ctx.verify_flags &= ~ssl.VERIFY_X509_STRICT

            # Try with SSL verification first
            self.es = Elasticsearch(
                'https://localhost:9200',
                basic_auth=('elastic', 'password'),
                timeout=30,
                retry_on_timeout=True,
                max_retries=3,
                ssl_context=ctx,
            )
            
            # Verify connection
            client_info = self.es.info()
            print('Connected to Elasticsearch with certificate!')
            pprint(client_info.body)
            
        except Exception as e:
            print(f"Error in certificate-based connection: {str(e)}")
            
            try:
                # Fall back to HTTP if HTTPS fails
                print("Attempting fallback to HTTP connection...")
                self.es = Elasticsearch(
                    'http://localhost:9200',
                    basic_auth=('elastic', 'password'),
                    timeout=30,
                    retry_on_timeout=True,
                    max_retries=3
                )
                
                # Verify connection
                client_info = self.es.info()
                print('Connected to Elasticsearch via HTTP!')
                pprint(client_info.body)
                
            except Exception as http_error:
                print(f"HTTP fallback failed: {str(http_error)}")
                raise


def get_elasticsearch():
    """
    Get or create the Elasticsearch client singleton with better error handling
    """
    global es_client
    if es_client is None:
        try:
            # Initialize only once
            es_connection = InitializeElasticsearch()
            es_client = es_connection.es
        except Exception as e:
            print(f"CRITICAL ERROR: Failed to connect to Elasticsearch: {str(e)}")
            print("Please ensure Elasticsearch is running and accessible at localhost:9200")
            print("Check if you need to run docker-compose")
            raise
            
    return es_client
