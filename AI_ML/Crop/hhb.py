import joblib

# Load the model
yield_model = joblib.load("model1.pkl")

# Check the expected input shape
print("Yield Model expects features shape:", yield_model.n_features_in_)
