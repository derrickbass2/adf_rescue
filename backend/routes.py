import firebase_admin
from flask import Blueprint, jsonify, Flask, request
from firebase_admin import credentials, auth

api_routes = Blueprint('api_routes', __name__)

@api_routes.route('/status', methods=['GET'])


def home():
    return "Welcome to the homepage"

cred = credentials.Certificate("path/to/your-service-account.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

@app.route('/validate-token', methods=['POST'])
def validate_token():
    token = request.json.get('token')
    try:
        decoded_token = auth.verify_id_token(token)
        return jsonify({"uid": decoded_token["uid"], "role": decoded_token.get("role", "user")}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == "__main__":
    app.run(debug=True)

cred = credentials.Certificate("path/to/your-service-account.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

@app.route('/validate-token', methods=['POST'])
def validate_token():
    token = request.json.get('token')
    try:
        decoded_token = auth.verify_id_token(token)
        return jsonify({"uid": decoded_token["uid"], "role": decoded_token.get("role", "user")}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == "__main__":
    app.run(debug=True)