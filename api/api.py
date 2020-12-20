from flask import Flask, request
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

<<<<<<< HEAD
@app.route("/predict", methods = ['GET','POST'])
=======
@app.route("/predict", methods = ['GET', 'POST'])
>>>>>>> 8ad0f8d548c349e34f56da6be36a88b13da14796
def predict():
    img = request.files['file'].read() 
    buf = io.BytesIO(img)   
    img = Image.open(buf)
    img =  base64.b64encode(Predict(img).output)
    # imgdata = base64.b64decode(img)   
    # filename = 'file.png'
    # with open(filename, 'wb') as f:
    #     f.write(imgdata)
    
    return img

if __name__ == "__main__":
    app.run(debug=True, port = 5001)

CORS(app, expose_headers='Authorization')
