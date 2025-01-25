"""
Configuration settings for the ADF Rescue application.
"""

import os
from datetime import timedelta


class Config:
    """Base configuration class."""

    # Database configuration
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or \
                              'postgresql://dbass:AffluentMongoose^2@localhost/adf_rescue'

    # Security configuration
    SECRET_KEY = os.getenv('SECRET_KEY') or 'your-secret-key-here'
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or 'your-jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # Firebase configuration
    FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS_PATH')

    # Logging configuration
    LOG_TO_STDOUT = os.getenv('LOG_TO_STDOUT')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

    # API configuration
    API_TITLE = 'ADF Rescue API'
    API_VERSION = 'v1'
    OPENAPI_VERSION = '3.0.2'


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG = False
    TESTING = False


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
