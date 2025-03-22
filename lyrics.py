import random

# List of 20 song titles
SONG_TITLES = [
    "Shape of You", "Blinding Lights", "Bohemian Rhapsody", "Rolling in the Deep",
    "Bad Guy", "Smells Like Teen Spirit", "Hotel California", "Imagine",
    "Stairway to Heaven", "Sweet Child O' Mine", "Billie Jean", "Hallelujah",
    "Shake It Off", "Wonderwall", "Lose Yourself", "Someone Like You",
    "Despacito", "Thinking Out Loud", "Uptown Funk", "Hello"
]

def get_random_song_title():
    return random.choice(SONG_TITLES)