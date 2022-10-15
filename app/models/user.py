from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .server import user_server

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)


    # enabling bidirectional many-to-one relationship so that this class
    # will include records it is associated to
    messages = db.relationship('Message', back_populates='user')

    # many-to-many
    inServers = db.relationship(
        'Server',
        secondary=user_server,
        backref='serverUsers'
        )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_with_servers(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'inServers': self.inServers
        }
