from .db import db

user_server = db.Table(
    'user_server',
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('serverId', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
)

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

    # enabling bidirectional many-to-one relationship so that
    # this class will include records it is associated to
    #
    # delete all channels and messages if server is deleted
    messages = db.relationship('Message', back_populates='server', cascade='all, delete')
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete')

    # many-to-many
    serverUsers = db.relationship(
        'User',
        secondary=user_server,
        backref='inServers'
        )
    # IMPORTANT: backref needs to be set to something different (in_Servers?)
    #               due to inServers being used in User model

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'imageUrl': self.imageUrl,
            'isDm': self.isDm,
            'ownerId': self.ownerId,
        }

    # return server info with messages
    # for use for DM servers (doesn't have any channels)
    def to_dict_dm_server(self):
        return {
            'id': self.id,
            'name': self.name,
            'imageUrl': self.imageUrl,
            'isDm': self.isDm,
            'messages': self.messages
        }

    def to_dict_with_users_and_channels(self):
        return {
            'id': self.id,
            'name': self.name,
            'imageUrl': self.imageUrl,
            'isDm': self.isDm,
            'ownerId': self.ownerId,
            'users': self.serverUsers,
            'channels': self.channels
        }
