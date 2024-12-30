from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')  # Correctly referring to config.py in the root directory

    db.init_app(app)
    migrate.init_app(app, db)

    # Importing routes from the backend folder
    from .backend.routes import main
    app.register_blueprint(main)

    return app