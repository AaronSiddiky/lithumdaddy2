from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={
    r"/quote": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]},
    r"/evaluate": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]},
    r"/image/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}
})

# ... rest of your code ... 