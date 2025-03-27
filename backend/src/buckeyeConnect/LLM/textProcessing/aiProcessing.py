from backend.src.buckeyeConnect.LLM.init.llama import LlamaModel
from backend.src.buckeyeConnect.LLM.init.embedded import distilBert_model
from backend.src.buckeyeConnect.LLM.tools.textUtils import text_utils

class text_processing:
    """
    A class that provides methods for text processing and embedding generation.
    """
    __instance = None

    @classmethod
    def get_instance(cls):
        """
        Returns the singleton instance of the text_processing class.
        """
        if cls.__instance is None:
            cls.__instance = text_processing()
        return cls.__instance

    def __init__(self):
        """
        Initializes the text_processing class.
        """
        self.llama_model = LlamaModel.get_instance()
        self.distilbert_model = distilBert_model.get_instance()


    def verify_token_length(self, text: str) -> bool:
        """
        distilberts token  limit is 512 tokens, this method checks if the text exceeds that limit.
       """
        tokens = self.distilbert_model.tokenizer.encode(text)
        return len(tokens) < 512
    
    def generate_description_embedding(self, text: str): 
        """
        Generates an embedding for the given text using the DistilBERT model.
        """

        description = text # need to keep original text for later use

        # Ensure the text does not exceed the token limit for DistilBERT
        truncate_prompt = "Reduce the text to fit within the token limit of 500 tokens without losing important context."
        while not self.verify_token_length(description):
            description = self.llama_model.generate(description, truncate_prompt)
        

        #embedd the description using the distilbert model
        description_embedding =  self.distilbert_model.generate_embedding(description)

        #get the embeddings from the mongoDB collection -> {string: {
        #                                                           description: tag description,
        #                                                           embedding: tag_embedding,
        #                                                           }   
        #                                                   } 
        tag_embeddings_data = {}  
                #TODO: figure out later

        #get the top K tags based on the description and embedding
        tags = text_utils.get_top_k_tags(description, description_embedding, k=5)
        
        
        
        #pass in the list of top k tags and the description again to get best tags
        verification_prompt = "Based on the description and the provided tags, are the tags applicable to this description? Y or N."
        verification_response = self.llama_model.generate(description, verification_prompt, tags) #tags need to have description includded
        if verification_response.lower() == "y":
            ranking_prompt = "Rank the tags based on their relevance to the description. Remove tags that don't apply. Return the response as a list of strings."
            ranked_tags = self.llama_model.generate(description, ranking_prompt, tags)

            ranked_tags = eval(ranked_tags)  # convert the string response to a list <- thoughts and prayers this works correctly

            #tags look good so now we can do vector weighting/avg to get the final embedding for description
            final_description_embedding = text_utils.get_vector_weighted_avg(description_embedding, tag_embeddings_data, ranked_tags)

            return final_description_embedding, ranked_tags


        else:
            #figure out what we want to do from here :D;
            pass
    
            