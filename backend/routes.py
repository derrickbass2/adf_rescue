"""
API routes for the ADF Rescue application.
"""

import os
from typing import Dict, Tuple, Optional
from flask import Blueprint, jsonify, request, current_app, Response

api_routes = Blueprint('api_routes', __name__)

# Temporary authentication middleware
@api_routes.before_request
def verify_token() -> Optional[Tuple[Response, int]]:
    """
    Development authentication middleware.
    """
    if request.endpoint == 'api_routes.health_check':
        return None

    # Development mode - set a mock user
    request.user_id = 'dev_user_123'
    return None

@api_routes.route('/health_check', methods=['GET'])
def health_check() -> tuple[Response, int]:
    """
    Health check endpoint to verify API status.
    """
    return jsonify({"status": "healthy"}), 200

@api_routes.route('/quiz/submit', methods=['POST'])
def submit_quiz() -> tuple[Response, int]:
    """
    Submit quiz results.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Store quiz results logic here
        return jsonify({
            "status": "success",
            "message": "Quiz results stored"
        }), 201
    except Exception as e:
        current_app.logger.error(f"Quiz submission failed: {str(e)}")
        return jsonify({"error": "Failed to save quiz results"}), 500

@api_routes.errorhandler(Exception)
def handle_error(error: Exception) -> tuple[Response, int]:
    """
    Global error handler for all unhandled exceptions.
    """
    current_app.logger.error(f"Unhandled error: {str(error)}")
    return jsonify({"error": "Internal server error"}), 500