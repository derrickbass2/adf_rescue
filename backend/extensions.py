"""
Flask extensions initialization.
"""

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager


# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt: JWTManager = JWTManager()


def init_extensions(app):
    """Initialize Flask extensions.

    Args:
        app: Flask application instance
    """
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    jwt.init_app(app)
