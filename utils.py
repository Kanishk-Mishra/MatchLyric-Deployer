from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

API_KEY = os.getenv("EDENAI_API_KEY")

def generate_lyric_snippet(song_title):
    try:
        prompt = f"Generate a short, recognizable lyric snippet (2-4 lines) from the song '{song_title}', but do not directly give away the title."

        url = "https://api.edenai.run/v2/text/generation"
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "providers": ["openai"],
            "model": "gpt-3.5-turbo",
            "text": prompt,
            "max_tokens": 50
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        result = response.json()

        # Check for errors
        if response.status_code != 200:
            return f"Error: {result.get('error', 'Unknown error occurred')}"

        return result['openai']['generated_text'].strip()

    except Exception as e:
        return f"Unexpected Error: {str(e)}"
