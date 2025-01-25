"""
Application entry point for ADF Rescue.

This module serves as the main entry point for running the application,
initializing the Flask CLI, and setting up development server configurations.
"""

from typing import NoReturn
from flask.cli import FlaskGroup
from app import create_app
from backend.extensions import db
from backend.websocket import socketio

app = create_app()
cli = FlaskGroup(app)

@cli.command("init-db")
def init_db() -> NoReturn:
    """
    Initialize the database with required tables and initial data.

    This command creates all necessary database tables and can be used to
    populate initial data if needed.

    Raises:
        SQLAlchemyError: If database initialization fails.
        ConfigError: If database configuration is invalid.
    """
    with app.app_context():
        db.create_all()
        print('Database initialized!')

if __name__ == "__main__":
    cli()