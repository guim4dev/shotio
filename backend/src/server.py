"""
Implements a backend server
"""

# Imports
from os import remove
import uuid

from flask import Flask, request
from flask_cors import CORS

from helpers.predictor import (
    create_model,
    predict_sample
)

# Server instantiation and configuration
server = Flask(__name__)
CORS(server)

# Load model
model = create_model()

@server.route("/")
def root():
    return "Hello world!"

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
    filename = uuid.uuid4()
    audio = request.files['audio']
    
    audio.save(f"./temp/{filename}.wav")

    prediction = predict_sample(model, f"{filename}")

    remove(f"./temp/{filename}.wav")

    return prediction
