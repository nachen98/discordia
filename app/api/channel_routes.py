from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Channel, db
from app.forms import ChannelForm



channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel_info(channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    if channel:
        return {"result" : channel.to_dict_with_messages()}, 200

    return {'errors': "channel not found"}, 404

# edit a channel
@channel_routes.route('/<int:channel_id>', methods=['POST'])
@login_required
def edit_channel(channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    print("edit channel:" , channel)

    if channel:
        form = ChannelForm() 
        print ('get form data ', form.data)
        if form.validate_on_submit:
            print ("get here")
            form['csrf_token'].data = request.cookies['csrf_token']
            form.populate_obj(channel)
            db.session.commit()
        return {"result" : channel.to_dict_with_messages()}, 200
    else:
        return {'errors': "channel not found"}, 404 



# delete a channel 
@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):

    
    channel = Channel.query.filter(Channel.id == channel_id).first()

    if channel is not None:
        db.session.delete(channel)
        db.session.commit()
        return {'success': "channel is deleted"} ,200

    else:
        return {'errors': "channel not found"}, 404


