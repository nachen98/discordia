from http import server
from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    channelId = db.Column(db.Integer, db.ForeignKey('channels.id'))
    serverId = db.Column(db.Integer, db.ForeignKey('server.id'))

    # enabling bidirectional many-to-one relationship so that this class
    # will include records it is associated to
    user = db.relationship('User', back_populates='messages')
    server = db.relationship('Server', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages')
