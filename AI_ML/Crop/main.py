from fastapi import FastAPI, File, UploadFile
import pdfplumber
import shutil
import requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Crop Model
try:
    crop_model = joblib.load("crop_model.pkl")
    print("✅ Crop Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading Crop Model: {e}")

# OpenWeather API details
WEATHER_API_KEY = "90a04739e7aac13cbe924f6b35ffba98"
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"

def get_weather_data(location):
    """Fetch temperature, humidity, and rainfall from OpenWeather API."""
    average_rainfall_data = {
        "Delhi": 800, "Mumbai": 2400, "Chennai": 1400, "Bangalore": 900
    }
    params = {"q": location, "appid": WEATHER_API_KEY, "units": "metric"}
    response = requests.get(WEATHER_API_URL, params=params)

    if response.status_code == 200:
        weather_data = response.json()
        rainfall = weather_data.get("rain", {}).get("1h", average_rainfall_data.get(location, 0))
        return {
            "temperature": weather_data["main"]["temp"],
            "humidity": weather_data["main"]["humidity"],
            "rainfall": rainfall
        }
    return {"temperature": "-", "humidity": "-", "rainfall": "-"}

def extract_npk_values(pdf_path):
    """Extracts NPK and pH values from a PDF file."""
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join([page.extract_text() or "" for page in pdf.pages])

    npk_values = {"pH": "-", "N": "-", "P": "-", "K": "-"}
    for line in text.split("\n"):
        if "pH Level" in line:
            npk_values["pH"] = line.split(":")[1].strip().split(" ")[0]
        elif "Nitrogen (N)" in line:
            npk_values["N"] = line.split(":")[1].strip().split(" ")[0]
        elif "Phosphorus (P)" in line:
            npk_values["P"] = line.split(":")[1].strip().split(" ")[0]
        elif "Potassium (K)" in line:
            npk_values["K"] = line.split(":")[1].strip().split(" ")[0]

    return npk_values

# Pydantic Model for Input
class CropInput(BaseModel):
    n: float
    p: float
    k: float
    ph: float
    temperature: float
    humidity: float
    rainfall: float

@app.post("/predict")
async def predict_crop(input_data: CropInput):
    """Predicts the best crop based on soil and weather conditions."""
    try:
        crop_features = np.array([[input_data.n, input_data.p, input_data.k,
                                   input_data.ph, input_data.temperature,
                                   input_data.humidity, input_data.rainfall]])
        predicted_crop = crop_model.predict(crop_features)[0]

        return {"crop": predicted_crop}
    except Exception as e:
        return {"crop": "Error", "error": str(e)}

@app.post("/extract")
async def extract_npk(file: UploadFile = File(...), location: str = "Delhi"):
    """Receives a PDF, extracts NPK values, fetches weather data, and returns all."""
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    npk_data = extract_npk_values(file_location)
    weather_data = get_weather_data(location)

    return {**npk_data, **weather_data}
