"""
Database models for the ADF Rescue application.
"""

from datetime import datetime, UTC
from typing import Dict, Any
from extensions import db


class User(db.Model):
    """User model for storing user account information."""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC),
                           onupdate=lambda: datetime.now(UTC))

    # Relationships
    quiz_results = db.relationship('QuizResult', backref='user', lazy='dynamic')

    def __repr__(self) -> str:
        """Return string representation of User."""
        return f"<User {self.username}>"

    def to_dict(self) -> Dict[str, Any]:
        """Convert user object to dictionary."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class QuizResult(db.Model):
    """Model for storing AI Implementation Health Check results."""

    __tablename__ = 'quiz_results'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_score = db.Column(db.Integer, nullable=False)
    section_scores = db.Column(db.JSON, nullable=False)
    recommendation = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))

    def __repr__(self) -> str:
        """Return string representation of QuizResult."""
        return f"<QuizResult {self.id} for User {self.user_id}>"

    def to_dict(self) -> Dict[str, Any]:
        """Convert quiz result object to dictionary."""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_score': self.total_score,
            'section_scores': self.section_scores,
            'recommendation': self.recommendation,
            'created_at': self.created_at.isoformat()
        }


class OrganizationProfile(db.Model):
    """Model for storing organization-specific information."""

    __tablename__ = 'organization_profiles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    industry = db.Column(db.String(80))
    size = db.Column(db.String(50))
    tech_stack = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC),
                           onupdate=lambda: datetime.now(UTC))

    def __repr__(self) -> str:
        """Return string representation of OrganizationProfile."""
        return f"<OrganizationProfile {self.name}>"

    def to_dict(self) -> Dict[str, Any]:
        """Convert organization profile object to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'industry': self.industry,
            'size': self.size,
            'tech_stack': self.tech_stack,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
