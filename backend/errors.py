"""
Error handling utilities for the ADF Rescue application.
"""

from typing import Optional

from flask import Response
from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES


def error_response(status_code: int, message: Optional[str] = None) -> Response:
    """Generate a standardized error response.

    Args:
        status_code: HTTP status code
        message: Optional error message

    Returns:
        JSON response with error details
    """
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response


def bad_request(message: str) -> Response:
    """Generate a 400 Bad Request error response.

    Args:
        message: Error message

    Returns:
        JSON response for bad request
    """
    return error_response(400, message)


def unauthorized(message: str = "Unauthorized") -> Response:
    """Generate a 401 Unauthorized error response.

    Args:
        message: Error message (default: "Unauthorized")

    Returns:
        JSON response for unauthorized access
    """
    return error_response(401, message)


def forbidden(message: str = "Forbidden") -> Response:
    """Generate a 403 Forbidden error response.

    Args:
        message: Error message (default: "Forbidden")

    Returns:
        JSON response for forbidden access
    """
    return error_response(403, message)


def not_found(message: str = "Resource not found") -> Response:
    """Generate a 404 Not Found error response.

    Args:
        message: Error message (default: "Resource not found")

    Returns:
        JSON response for resource not found
    """
    return error_response(404, message)


def server_error(message: str = "Internal server error") -> Response:
    """Generate a 500 Internal Server Error response.

    Args:
        message: Error message (default: "Internal server error")

    Returns:
        JSON response for server error
    """
    return error_response(500, message)