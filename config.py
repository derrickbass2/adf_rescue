import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Optional, but good for performance
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'postgresql://dbass:AffluentMongoose^2@localhost/adf_rescue'