# import sqlite3
# import json
from contextlib import contextmanager
import google.generativeai as genai
from typing import List, Dict
from .core.config import settings


#--Databse setup
# DB_FILE = "chat_history.db"

# @contextmanager
# def get_db_connection():
#     """Context manager for handling database connections."""
#     conn = sqlite3.connect(DB_FILE)
#     try:
#         yield conn
#     finally:
#         conn.close()


# --- Client Initialization ---
# Initializes the OpenAI client once when the module is loaded.
# This avoids re-creating the client on every request.
try:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    # This will log an error if the API key is not set.
    # In a production environment, (we were asked to ignore security in production we would use a better logger)
    print(f"Error initializing Google Gemini client: {e}")
    model = None


def get_llm_response(question: str, history: List[Dict[str, str]]) -> str:
    """
    Calls the Google Gemini API to get a response from the language model.

    Args:
        question (str): The user's current question.
        history (List[Dict[str, str]]): The conversation history, where each
                                        item is a dict with 'role' and 'content'.

    Returns:
        str: The response from the language model.
    """
    if not model:
        return "Google Gemini client is not initialized. Please check your API key."

     # --- History Formatting ---
    # Gemini expects the 'role' for the AI to be 'model', not 'assistant'.

    gemini_history = []
    for message in history:
        role = 'model' if message['role'] == 'assistant' else 'user'
        gemini_history.append({'role': role, 'parts': [message['content']]})

    chat_session = model.start_chat(history=gemini_history)

    try:
        # Send the new user question to the model.
        response = chat_session.send_message(question)
        return response.text
    except Exception as e:
        print(f"An error occurred with the Gemini API: {e}")
        return f"Error: Could not retrieve a response from the AI. Details: {e}"
