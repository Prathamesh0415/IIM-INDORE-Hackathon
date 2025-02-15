import joblib
import numpy as np

# Load the trained model
model = joblib.load("crop_model.pkl")

# Test input (replace with actual expected values)
test_input = np.array([[50, 30, 20, 6.5, 27, 60, 200]])

# Make prediction
predicted_crop = model.predict(test_input)[0]

print("Predicted Crop:", predicted_crop)
