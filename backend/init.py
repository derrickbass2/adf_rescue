"""
Initialize Flask application with database, migrations, and logging configuration.
"""

import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask
from config import Config
from extensions import init_extensions
from websocket import socketio


def create_app(config_class=Config):
    """Create and configure the Flask application.

    Args:
        config_class: Configuration class (default: Config)

    Returns:
        Flask application instance
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    init_extensions(app)
    # Initialize SocketIO
    socketio.init_app(app)
    # Register blueprints
    from routes import api_routes
    app.register_blueprint(api_routes)

    # Setup logging
    if not app.debug and not app.testing:
        _configure_logging(app)

    return app


def _configure_logging(app):
    """Configure logging for the application.

    Args:
        app: Flask application instance
    """
    if not os.path.exists('logs'):
        os.mkdir('logs')

    file_handler = RotatingFileHandler(
        'logs/adf_rescue.log',
        maxBytes=10240,
        backupCount=10
    )
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)

    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('ADF Rescue startup')
    app.logger.info(f'Environment: {os.getenv("FLASK_ENV")}')
    app.logger.info(f'Database URL: {os.getenv("DATABASE_URL")}')
    app.logger.info(f'Secret Key: {os.getenv("SECRET_KEY")}')
    app.logger.info(f'JWT Secret Key: {os.getenv("JWT_SECRET_KEY")}')
    app.logger.info(f'Firebase Credentials: {os.getenv("FIREBASE_CREDENTIALS_PATH")}')
    app.logger.info(f'Log to Stdout: {os.getenv("LOG_TO_STDOUT")}')
    app.logger.info(f'Log Level: {os.getenv("LOG_LEVEL")}')
    app.logger.info(f'API Title: {os.getenv("API_TITLE")}')
    app.logger.info(f'API Version: {os.getenv("API_VERSION")}')
    app.logger.info(f'OpenAPI Version: {os.getenv("OPENAPI_VERSION")}')
    app.logger.info(f'Debug: {os.getenv("DEBUG")}')
    app.logger.info(f'Testing: {os.getenv("TESTING")}')
    app.logger.info(f'SQLAlchemy Track Modifications: {os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS")}')
    app.logger.info(f'SQLAlchemy Database URI: {os.getenv("SQLALCHEMY_DATABASE_URI")}')
    app.logger.info(f'JWT Access Token Expires: {os.getenv("JWT_ACCESS_TOKEN_EXPIRES")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_CONFIG")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_ENV")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_APP")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_DEBUG")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_PORT")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_HOST")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_CERT")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_KEY")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_SERVER_NAME")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_USE_RELOADER")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_USE_DEBUGGER")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_USE_DEV_SERVER")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_USE_REVERSE_PROXY")}')
    app.logger.info(f'Config Class: {os.getenv("FLASK_RUN_USE_SSL")}')

