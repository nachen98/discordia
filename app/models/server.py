from .db import db

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=True)
    isDm = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'))

    # enabling bidirectional many-to-one relationship so that this class
    # will include records it is associated to
    messages = db.relationship('Message', back_populates='server')
    channels = db.relationship('Channel', back_populates='server')
