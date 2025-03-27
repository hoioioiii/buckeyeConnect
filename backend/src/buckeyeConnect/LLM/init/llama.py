from transformers import LlamaForCausalLM, LlamaTokenizer

class LlamaModel:
    """
    A singleton class that provides a pre-trained LLaMA model for text generation.
    """
    _instance = None

    @classmethod
    def get_instance(cls):
        """
        Returns the singleton instance of LlamaModel.
        """
        if cls._instance is None:
            cls._instance = LlamaModel()
            cls._instance.model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
            cls._instance.tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
            
        return cls._instance