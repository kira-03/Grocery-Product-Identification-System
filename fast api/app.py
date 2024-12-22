import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import numpy as np
from huggingface_hub import hf_hub_download
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input as resnet_preprocess
from tensorflow.keras.applications.densenet import preprocess_input as densenet_preprocess
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input as mobilenet_preprocess
import json
from PIL import Image
import io

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hugging Face repository details
HUGGING_FACE_REPO = "kira03/GroceryGo"
MODEL_FILES = {
    "resnet50": "resnet50_model.keras",
    "densenet169": "densenet169_model.keras",
    "mobilenet_v2": "mobilenet_v2_model.keras",
}
CLASS_INDICES_FILE = "dataset-details.json"

# Download models and class indices from Hugging Face
models = {}
for model_name, model_filename in MODEL_FILES.items():
    logger.info(f"Downloading {model_name} from Hugging Face...")
    try:
        model_path = hf_hub_download(repo_id=HUGGING_FACE_REPO, filename=model_filename)
        models[model_name] = tf.keras.models.load_model(model_path)
        logger.info(f"Model {model_name} loaded successfully")
    except Exception as e:
        logger.error(f"Failed to download or load {model_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error loading {model_name}: {str(e)}")

logger.info(f"Downloading class indices from Hugging Face...")
try:
    class_indices_path = hf_hub_download(repo_id=HUGGING_FACE_REPO, filename=CLASS_INDICES_FILE)
    with open(class_indices_path, "r") as f:
        class_indices = json.load(f)
    logger.info(f"Loaded {len(class_indices)} classes")
except Exception as e:
    logger.error(f"Failed to download class indices: {str(e)}")
    raise HTTPException(status_code=500, detail="Error loading class indices")

def predict_image(image, model_name, class_indices):
    model = models[model_name]
    
    # Preprocess the image
    input_arr = img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.

    # Apply appropriate preprocessing based on the model
    if model_name == 'resnet50':
        input_arr = resnet_preprocess(input_arr)
    elif model_name == 'densenet169':
        input_arr = densenet_preprocess(input_arr)
    elif model_name == 'mobilenet_v2':
        input_arr = mobilenet_preprocess(input_arr)

    # Predict the image
    predictions = model.predict(input_arr)
    result_index = np.argmax(predictions)
    predicted_class = list(class_indices.keys())[result_index]  # Map index to class name
    confidence = float(predictions[0][result_index])

    return predicted_class, confidence, predictions

@app.post("/predict")
async def predict(model: str = Form(...), image: UploadFile = File(...)):
    if model not in models:
        raise HTTPException(status_code=400, detail="Invalid model selection")
    if not image:
        raise HTTPException(status_code=422, detail="Image is missing")

    logger.info(f"Received prediction request for model: {model}, image: {image.filename}")

    try:
        # Read and process the image
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data)).convert('RGB')
        img = img.resize((224, 224))  # Resize to match input size for all models
        logger.info(f"Image processed: size {img.size}, mode {img.mode}")

        # Perform prediction
        predicted_class, confidence, raw_predictions = predict_image(img, model, class_indices)

        logger.info(f"Prediction successful. Model: {model}, Class: {predicted_class}, Confidence: {confidence}")
        logger.debug(f"Raw predictions: {raw_predictions}")

        # Return the results
        return JSONResponse(content={
            "predictedClass": predicted_class,
            "confidence": confidence,
            "rawPredictions": raw_predictions.tolist()  # Convert numpy array to list for JSON serialization
        })

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the prediction API",
        "modelsLoaded": list(models.keys()),
        "classesLoaded": len(class_indices)
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting the server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
