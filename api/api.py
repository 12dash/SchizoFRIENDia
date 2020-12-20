from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
from inference import Predict 

import base64
import io
from PIL import Image
# import base64

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Server"

@app.route("/predict", methods = ['GET','POST'])
def predict():
    img = request.files['file'].read() 
    buf = io.BytesIO(img)   
    img = Image.open(buf)
    img = Predict(img)

    with open("test.png", "rb") as img_file:
        img = base64.b64encode(img_file.read())
        
    return img

if __name__ == "__main__":
    app.run(debug=True, port = 5001)

CORS(app, expose_headers='Authorization')
