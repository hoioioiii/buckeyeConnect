import os
import sys
from pathlib import Path
from elasticsearch import Elasticsearch

script_dir = Path(__file__).resolve().parent
src_dir = script_dir / 'src'
sys.path.insert(0, str(src_dir))

try:
    from src.buckeyeConnect.elastic.init_elasticsearch import initialize_elasticsearch
    from src.buckeyeConnect.config import app

    
    if __name__ == '__main__':
        print("Initializing Elasticsearch...")
        success = initialize_elasticsearch()

        
        if not success:
            print("Warning: Elasticsearch initialization failed. API may not work correctly.")
            print("Continuing with mock data...")
        
        print("Starting BuckeyeConnect API...")
        
        # Enable more verbose CORS debugging
        app.config['CORS_HEADERS'] = 'Content-Type,Authorization'
        app.config['DEBUG'] = True
        
        app.run(debug=True, host='0.0.0.0', port=5000)

except Exception as e:
    print(f"Error starting application: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)