from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    topic = db.Column(db.String(255), nullable=True)
    is_voice = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))

    # enabling bidirectional many-to-one relationship so that
    # this class will include records it is associated to
    #
    # delete all messages if channel is deleted
    messages = db.relationship('Message', back_populates='channel', cascade='all, delete')
    server = db.relationship('Server', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'is_voice': self.is_voice
        }


    def to_dict_with_messages(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'is_voice': self.is_voice,
            'messages': [message.to_dict()  for message in self.messages ]
        }

    def __repr__(self):
        return f'<Channel: id={self.id}, name={self.name}, topic={self.topic}, is_voice={self.is_voice}>'
