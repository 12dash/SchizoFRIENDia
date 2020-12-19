from flask import Flask, request
from flask_cors import CORS, cross_origin
from inference import Predict 

import base64
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Server"

@app.route("/predict")
def predict():
    img = request.files['file']
    print(img)
    img = base64.b64decode(img)
    buf = io.BytesIO(img)
    img = Image.open(buf)
    img =  base64.b64encode(Predict().output)    
    return img

if __name__ == "__main__":
    app.run(debug=True, port = 5001)

CORS(app, expose_headers='Authorization')
