from flask import Blueprint, jsonify

api_routes = Blueprint('api', __name__)

@api_routes.route('/status', methods=['GET'])
def status():
    return jsonify({"message": "Server is running!"})

# Define the blueprint
main = Blueprint('main', __name__)

# Define your routes here
@main.route('/')
def home():
    return "Welcome to the homepage"