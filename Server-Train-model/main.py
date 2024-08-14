import pandas as pd
import csv
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate('firebase.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tranducthien-efd22-default-rtdb.asia-southeast1.firebasedatabase.app'
})
# Load the data from the provided link
dataLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBF-LTEigaGsW4jI03UfEDuBjbKSJNYzLgcq71Q8oTec0EaW4ZhtLQ7ESzSLY-bvL-w8rDLVZJv9ta/pub?output=csv"
df = pd.read_csv(dataLink)
df = df.iloc[:, 1:]
df.columns = ['up', 'down', 'stop', 'on', 'off']

# Convert data to long format
df_long = df.melt(var_name='title', value_name='command')
df_long = df_long.dropna()

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df_long['command'], df_long['title'], test_size=0.2, random_state=42)

# Create and train the model pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Flask application setup
app = Flask(__name__)
CORS(app)
portOpen = 5000

@app.route('/command', methods=['POST'])
def command():
    data = request.get_json()
    new_command = data.get('command')

    if not new_command:
        return jsonify({'error': 'No command provided'}), 400
    print("new_command: ",new_command)
    print("predict: ",model.predict([new_command]))
    print("predict_proba: ",model.predict_proba([new_command]))
    print("title: ",model.classes_)

    predicted_proba = model.predict_proba([new_command])[0]
    max_prob = 0
    predicted_title = ''
    
    for title, prob in zip(model.classes_, predicted_proba):
        if prob > max_prob:
            max_prob = prob
            predicted_title = title

    if max_prob < 0.3:
        predicted_title = 'Uncertain'

    # Update Firebase with the new predicted title
    ref = db.reference('Car')
    if predicted_title == 'up':
        ref.update({"motor": "up"})
    elif predicted_title == 'down':
        ref.update({"motor": "down"})
    elif predicted_title == 'stop':
        ref.update({"motor": "stop"})
    elif predicted_title == 'off':
        ref.update({"led": "off"})
    elif predicted_title == 'on':
        ref.update({"led": "on"})

    result = {
        'predicted_title': predicted_title,
        'probabilities': {title: prob for title, prob in zip(model.classes_, predicted_proba)}
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(port=portOpen)