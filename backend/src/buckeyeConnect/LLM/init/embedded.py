from sentence_transformers import SentenceTransformer
import numpy as np
from tagData import campus_activity_tags_description


class distilBert_model:
    """
    A singleton class that provides a pre-trained distilBERT model for text embedding.
    """
    _instance = None

    @classmethod
    def get_instance(cls):
        """
        Returns the singleton instance of distilBert_model.
        """
        if cls._instance is None:
            cls._instance = SentenceTransformer("distilbert-base-nli-stsb-mean-tokens")
        return cls._instance
   

class tag_embedding:
    def embed_tag_data(self) -> bool:
        model = distilBert_model.get_instance()
        primary_tags = campus_activity_tags_description["primary_tags"]
        secondary_tags = campus_activity_tags_description["secondary_tags"]
        activity_type = secondary_tags["activity_type"]
        attribute_tags = secondary_tags["tag_attributes"]
        audience_tags = secondary_tags["audience"]

        tag_embeddings = {
            'primary_tags': {},
            'secondary_tags': {
                'activity_type': {},
                'tag_attributes': {},
                'audience': {}
            }
        }

        # Generate embeddings for tags
        for tag,description  in primary_tags.items():
            embedding = model.encode(description)
            tag_embeddings['primary_tags'][tag] = embedding

        for tag,description  in activity_type.items():
            embedding = model.encode(description)
            tag_embeddings['secondary_tags']['activity_type'][tag] = embedding
        
        for tag,description  in attribute_tags.items():
            embedding = model.encode(description)
            tag_embeddings['secondary_tags']['tag_attributes'][tag] = embedding
        
        for tag,description  in audience_tags.items():
            embedding = model.encode(description)
            tag_embeddings['secondary_tags']['audience'][tag] = embedding

        #Save the data into the mongoDB

        return self.vector_db_store(tag_embeddings)

        return False

    def vector_db_store(self, tag_vector_map: dict) -> bool:
        """
        Stores the generated embedding vector in OUR mONGO dB

        Args:
            vector (string : np.ndarray): The embedding vector to be stored.
        """
        #TODO: IMPLEMENT W MONFOGO DB Vector db
        pass