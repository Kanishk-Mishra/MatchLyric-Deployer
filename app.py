from flask import Flask, jsonify, send_from_directory, request, render_template
from flask_cors import CORS
from lyrics import get_random_song_title
from utils import generate_lyric_snippet

app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    # return send_from_directory('../frontend/public', 'index.html')
    return render_template('index.html')

# @app.route('/src/<path:filename>')
# def serve_js(filename):
#     return send_from_directory('../frontend/src', filename)

# @app.route('/assets/fonts/<path:filename>')
# def serve_font(filename):
#     return send_from_directory('../frontend/public/assets/fonts', filename)

# @app.route('/assets/images/<path:filename>')
# def serve_image(filename):
#     return send_from_directory('../frontend/public/assets/images', filename)

# Endpoint to generate a lyric snippet
@app.route('/api/generate', methods=['GET'])
def generate():
    try:
        song_title = get_random_song_title()
        snippet = generate_lyric_snippet(song_title)
        return jsonify({"snippet": snippet, "song_title": song_title})
    except Exception as e:
        print(f"Error in /generate endpoint: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
