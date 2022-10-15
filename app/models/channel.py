from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    topic = db.Column(db.String(255), nullable=True)
    isVoice = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    serverId = db.Column(db.Integer, db.ForeignKey('servers.id'))

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
            'isVoice': self.isVoice,
            'messages': self.messages
        }
