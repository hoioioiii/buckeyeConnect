
from elastic.connection.connection import InitalizeElasticsearch 

def main():
    try:
        es = InitalizeElasticsearch()
        print("Successfully connected to Elasticsearch")

        loadData




    except Exception as e:
        print(f"Failed to connect: {e}")
 


if __name__ == "__main__":
    main()