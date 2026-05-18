import json

import ollama

from src.api.schemas.classify import ClassifyResponse
from src.models.intent import INTENT_DEFINITIONS, INTENT_LIST, IntentLabel

# --- Configuration ---
MODEL_NAME = "gemma4:e4b"
API_URL = "http://localhost:11434"

# "reasoning": "string"   # A brief, one-sentence explanation of why this intent was chosen.

class IntentClassifier:
    def classify(
        self,
        user_input: str,
        possible_intents: list[str] | None = None,
    ) -> ClassifyResponse:
        """
        Uses the Ollama client to classify user intent and returns a structured response.
        """
        if possible_intents is None:
            possible_intents = INTENT_LIST

        intent_definitions = "\n".join(
            f"- {intent}: {INTENT_DEFINITIONS[intent]}"
            for intent in possible_intents
            if intent in INTENT_DEFINITIONS
        )

        schema_definition = f"""
        You are an Intent Classification Engine. Your sole job is to analyze a user's message and classify the intent 
        based on the provided list of possible intents.

        Available intent classifications:
        {intent_definitions}
        
        Your entire response MUST be a single JSON object and nothing else.
        
        The JSON schema you MUST follow is:
        {{
            "intent": "string",   # The most appropriate intent from the possible intents list.
            "confidence_score": "float", # A numerical score (0.0 to 1.0) indicating your confidence in the choice.
            
        }}
        
        IMPORTANT: Do not output any markdown (like ```json), explanatory text, or comments. Output ONLY the JSON object.
        """

        system_message = schema_definition

        user_message = f"""
        Please classify the following user request based on these possible intents: {', '.join(possible_intents)}.
        
        User Request: "{user_input}"
        """

        try:
            client = ollama.Client(host=API_URL)
            response = client.chat(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message},
                ],
            )

            full_response_text = response["message"]["content"].strip()

            try:
                classification_result = json.loads(full_response_text)
                try:
                    confidence = float(classification_result["confidence_score"])
                    if confidence < 0.6:
                        return ClassifyResponse(intent=IntentLabel.unknown, confidence=0.0)

                    return ClassifyResponse(
                        intent=IntentLabel(classification_result["intent"]),
                        confidence=confidence,
                    )
                except (KeyError, ValueError, TypeError):
                    return ClassifyResponse(intent=IntentLabel.unknown, confidence=0.0)
            except json.JSONDecodeError:
                return ClassifyResponse(intent=IntentLabel.unknown, confidence=0.0)

        except Exception:
            return ClassifyResponse(intent=IntentLabel.unknown, confidence=0.0)
