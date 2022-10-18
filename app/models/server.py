from .db import db

user_server = db.Table(
    'user_server',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
)

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    is_dm = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # Foreign Keys
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # enabling bidirectional many-to-one relationship so that
    # this class will include records it is associated to
    #
    # delete all channels and messages if server is deleted
    messages = db.relationship('Message', back_populates='server', cascade='all, delete')
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete')

    # many-to-many
    server_users = db.relationship(
        'User',
        secondary=user_server,
        back_populates='in_servers'
        )
    # IMPORTANT: backref needs to be set to something different (in_Servers?)
    #               due to inServers being used in User model

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'is_dm': self.is_dm,
            'ownerId': self.owner_id,
        }

    # return server info with messages
    # for use for DM servers (doesn't have any channels)
    def to_dict_dm_server(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'is_dm': self.is_dm,
            'messages': [message.to_dict() for message in self.messages]
        }

    def to_dict_with_users_and_channels(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'is_dm': self.is_dm,
            'owner_id': self.owner_id,
            'users': [user.to_dict() for user in self.server_users],
            'channels': [channel.to_dict() for channel in self.channels]
        }

    def __repr__(self):
        return f'<Server, id={self.id}, is_dm={self.is_dm}, name={self.name}, image_url={self.image_url}>'
