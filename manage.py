"""
CLI management script for ADF Rescue.

This module provides command-line interface tools for managing the application,
including database operations and development utilities.
"""

from typing import NoReturn

from flask.cli import FlaskGroup

from app import create_app, db

app = create_app()
cli = FlaskGroup(app)

@cli.command("create-db")
def create_db() -> NoReturn:
    """
    Create all database tables.

    This command initializes the database schema based on the defined models.
    It should be run once before starting the application for the first time.

    Raises:
        SQLAlchemyError: If database creation fails.
    """
    db.create_all()
    print("Database tables created successfully!")

@cli.command("drop-db")
def drop_db() -> NoReturn:
    """
    Drop all database tables.

    This command removes all tables from the database. It should be used with
    caution as it will result in permanent data loss.

    Raises:
        SQLAlchemyError: If database deletion fails.
    """
    if input("Are you sure you want to drop all tables? (y/N): ").lower() == 'y':
        db.drop_all()
        print("Database tables dropped successfully!")
    else:
        print("Operation cancelled.")

if __name__ == "__main__":
    cli()