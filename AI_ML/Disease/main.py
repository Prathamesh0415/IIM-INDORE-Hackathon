import tensorflow as tf
import numpy as np
from PIL import Image
import io
from fastapi import FastAPI, File, UploadFile, HTTPException

# Load trained model
model = tf.keras.models.load_model("./model.keras")
app = FastAPI()

# List of plant diseases
plant_diseases = [
    "Apple_black_rot", "Applehealthy", "Applerust", "Apple_scab",
    "Cassava_bacterial_blight", "Cassavabrown_streak_disease", "Cassava_green_mottle", 
    "Cassava_healthy", "Cassava_mosaic_disease",
    "Cherry_healthy", "Cherry_powdery_mildew",
    "Chili_healthy", "Chilileaf_curl", "Chilileaf_spot", "Chiliwhitefly", "Chili_yellowish",
    "Coffee_cercospora_leaf_spot", "Coffeehealthy", "Coffeered_spider_mite", "Coffee_rust",
    "Corn_common_rust", "Corngray_leaf_spot", "Cornhealthy", "Corn_northern_leaf_blight",
    "Cucumber_diseased", "Cucumber_healthy",
    "Gauva_diseased", "Gauva_healthy",
    "Grape_black_measles", "Grapeblack_rot", "Grape_healthy", "Grape_leaf_blight(isariopsis_leaf_spot)",
    "Jamun_diseased", "Jamun_healthy",
    "Lemon_diseased", "Lemon_healthy",
    "Mango_diseased", "Mango_healthy",
    "Peach_bacterial_spot", "Peach_healthy",
    "Pepper_bell_bacterial_spot", "Pepper_bell_healthy",
    "Pomegranate_diseased", "Pomegranate_healthy",
    "Potato_early_blight", "Potatohealthy", "Potato_late_blight",
    "Rice_brown_spot", "Ricehealthy", "Ricehispa", "Riceleaf_blast", "Rice_neck_blast",
    "Soybean_bacterial_blight", "Soybeancaterpillar", "Soybean_diabrotica_speciosa",
    "Soybean_downy_mildew", "Soybeanhealthy", "Soybeanmosaic_virus", "Soybean_powdery_mildew", 
    "Soybean_rust", "Soybean_southern_blight",
    "Strawberry__leaf_scorch", "Strawberry_healthy",
    "Sugarcane_bacterial_blight", "Sugarcanehealthy", "Sugarcanered_rot", "Sugarcanered_stripe", "Sugarcane_rust",
    "Tea_algal_leaf", "Teaanthracnose", "Teabird_eye_spot", "Teabrown_blight", "Teahealthy", "Tea_red_leaf_spot",
    "Tomato_bacterial_spot", "Tomatoearly_blight", "Tomatohealthy", "Tomatolate_blight", "Tomato_leaf_mold", 
    "Tomato_mosaic_virus", "Tomato_septoria_leaf_spot", "Tomato_spider_mites(two_spotted_spider_mite)",
    "Tomato_target_spot", "Tomato_yellow_leaf_curl_virus",
    "Wheat_brown_rust", "Wheathealthy", "Wheatseptoria", "Wheat_yellow_rust"
]

# Preprocess image
def preprocess_image(image: Image.Image, target_size: tuple = (128, 128)) -> np.ndarray:
    image = image.convert("RGB")  # Convert to RGB to prevent errors
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0  # Normalize pixel values
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array

# Get top 3 predictions
def get_top_3_predictions(probs):
    flat_probs = probs.flatten()
    top_3_indices = np.argsort(flat_probs)[-3:][::-1]
    top_3_probs = flat_probs[top_3_indices] * 100  # Convert to percentage
    return top_3_probs, top_3_indices

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    # Open image from stream
    image = Image.open(file.file)
  
    # Preprocess image
    input_tensor = preprocess_image(image)
  
    # Make prediction
    prediction = model.predict(input_tensor)

    # Apply softmax if model doesn't include it
    if not np.allclose(prediction.sum(), 1.0):
        prediction = tf.nn.softmax(prediction).numpy()

    # Get top 3 predictions
    top_3_probs, top_3_indices = get_top_3_predictions(prediction)

    # Prepare results
    results = [
        {
            "disease": plant_diseases[idx],
            "probability": round(float(prob), 2)  # Round to 2 decimal places
        }
        for idx, prob in zip(top_3_indices, top_3_probs)
    ]
  
    return {"top_3_predictions": results}
