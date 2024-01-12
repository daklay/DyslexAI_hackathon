import numpy as np
#import pickle
import joblib


model = joblib.load('random_forest_model.pkl')

"""model.predict(previously_loaded_data)
"""
"""# Load the model
with open('random_forest_model.pkl', 'rb') as file:
    model = pickle.load(file)"""

print("Loaded model:", model)

# Take user input
user_input = input("Enter a number: ")
user_input = int(user_input) # The model expects a 2D array
user_input = np.array([[user_input]])

# Get the prediction

prediction = model.predict(user_input)

print("The predicted label is:", prediction[0])
