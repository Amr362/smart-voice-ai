from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False) # Hashed password
    name = db.Column(db.String(100), nullable=False)
    plan = db.Column(db.String(50), default='المجاني')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    verified = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'name': self.name,
            'plan': self.plan,
            'created_at': self.created_at.isoformat() + 'Z',
            'verified': self.verified
        }


