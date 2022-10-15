from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel, db



channel_routes = Blueprint('channels', __name__)


#get channel detail by id
@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    channel =  Channel.query.get(channel_id)
    return jsonify(channel), 200



# update a channel
@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    # TODO   check how to update db with form data from req



# delete a channel 
@channel_routes.rout('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()

    if channel is not None:
        db.session.delete(channel)
        db.session.commit()
        return 200

    else:
        return {'errors': "channel not found"}, 404


