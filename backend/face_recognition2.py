
from deepface import DeepFace
from PIL import Image
import numpy as np
import io
import requests
from pymongo import MongoClient
from urllib.parse import urlparse
import cv2
import sys


def load_image_from_path(image_path):
  
    image_pil = Image.open(image_path)
    image_np = np.array(image_pil)
    return image_np

def load_image_from_bytes(image_bytes):

    image_pil = Image.open(io.BytesIO(image_bytes))
    image_np = np.array(image_pil)
    return image_np


def authenticate(captured_img_path, db_collection_name):
    try:
 
        parsed_uri = urlparse('mongodb://localhost:27017/facialRecognitionDB')
        db_name = parsed_uri.path[1:]
        
       
        client = MongoClient('mongodb://localhost:27017/')
        db = client[db_name]
        collection = db[db_collection_name]

    
        documents = collection.find({}, {'image': 1})  
        db_image_urls = [doc['image'] for doc in documents]

        captured_img_np_bgr = captured_img_path

        
        for db_image_url in db_image_urls:
            db_img_bytes = requests.get(db_image_url).content
            db_img_np = load_image_from_bytes(db_img_bytes)

            db_img_np_bgr = cv2.cvtColor(db_img_np, cv2.COLOR_RGB2BGR)

            df = DeepFace.verify(img1_path=captured_img_np_bgr,img2_path=db_img_np_bgr, model_name='Facenet',enforce_detection=False)
            if df["verified"]:
                return True
        
        return False 
    except Exception as e:
        print(f"An exception occurred {e}")



if len(sys.argv) != 2:
    print("Usage: python verify_face.py <captured_img_path> <db_img_url>")
    sys.exit(1)

captured_img_path = sys.argv[1]

result = authenticate(captured_img_path, 'users')
print(result)
