"""
Main application factory for ADF Rescue.

This module initializes the Flask application with all necessary extensions,
configurations, and blueprints.
"""

from typing import Optional
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from backend.extensions import db
from backend.routes import api_routes

migrate = Migrate()


def create_app(config_class: Optional[type] = Config) -> Flask:
    """
    Create and configure the Flask application.

    Args:
        config_class: Configuration class to use. Defaults to Config.

    Returns:
        Flask: Configured Flask application instance.

    Raises:
        ImportError: If required extensions cannot be imported.
        ConfigError: If configuration is invalid.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(api_routes, url_prefix='/api')

    return app