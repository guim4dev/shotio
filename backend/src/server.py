"""
Implements a backend server
"""

# Imports
from flask import Flask, request, jsonify
from datetime import datetime

# Server instantiation and configuration
server = Flask(__name__)

# Foo
@server.route("/")
def root() -> dict:
    """
    Root route.

    Returns:
        dict: {
            status (int): status code.
        }
    """
    return {
        "status": 200
    }

@server.route("/predict", methods = ['POST'])
def predict() -> dict:
    """
    Route to predict if audio file is a gunshot.

    Returns:
        dict: {
            result (bool): whether is a gunshot or not.
            probability (float): probability of being a gunshot.
        }
    """
    audio = request.files['audio']
    time_str = datetime.now().strftime("%Y%m%d%H%M%S")
    
    print(audio)
