from http import server
from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))

    # enabling bidirectional many-to-one relationship so that this class
    # will include records it is associated to
    user = db.relationship('User', back_populates='messages')
    server = db.relationship('Server', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'channel_id': self.channel_id,
            'createdAt': self.created_at
        }

    def __repr__(self):
        return f'<Message, id={self.id}, body={self.body}, sender={self.user_id}, server={self.server_id}, channel={self.channel_id}>'
