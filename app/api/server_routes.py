from flask import Blueprint, request, jsonify
from itsdangerous import json
from app.models import Server, Channel, User,db
from app.forms import ServerForm, ChannelForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime


server_routes = Blueprint('servers', __name__)


# create new channel with server_id
@server_routes.route('/<int:server_id>/channels', methods=['POST'])
@login_required
def create_channel(server_id):

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (form.validate_on_submit()):
        channel = Channel()
        form.populate_obj(channel)
        channel.server_id = server_id
        channel.is_voice=False
        channel.created_at=datetime.now()
        channel.updated_at=datetime.now()
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict(),201

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# get all regular server associated with current user
@server_routes.route('/regular/current')
@login_required
def get_regular_servers():

    user_id = current_user.id
    user = User.query.get(user_id)
    servers = user.in_servers
    result = []
    for server in servers:
        if not server.is_dm:
            result.append(server.to_dict_with_users_and_channels())
    return {"result" : result} , 200


# get all dm(direct message) servers associated with current user
@server_routes.route('/dm/current')
@login_required
def get_dm_servers():
    user_id = current_user.id
    user = User.query.get(user_id)
    servers = user.in_servers
    result = []
    for server in servers:
        if server.is_dm:
            result.append(server.to_dict_dm_server())
    return {"result" : result} , 200
 

# get regular server details by id
@server_routes.route('/<int:server_id>')
@login_required
def get_server_by_id(server_id):
    server = Server.query.get(server_id)
    return server.to_dict_with_users_and_channels(), 200


# create a regular server
@server_routes.route('/regular', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        server = Server()
        form.populate_obj(server)
        server.is_dm = False
        server.owner_id = current_user.id
        server.created_at = datetime.now()
        server.updated_at = datetime.now()
        db.session.add(server)
        db.session.commit()

        # once a regular server created, automatically create a "general" channel
        channel = Channel()
        channel.name="general"
        channel.server_id = server.id
        channel.created_at = datetime.now()
        channel.updated_at = datetime.now()
        channel.is_voice=False
        channel.topic = ""
        db.session.add(channel)
        db.session.commit()
        return server.to_dict(), 201
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# edit a regular server
@server_routes.route('/regular/<int:server_id>', methods=['POST'])
@login_required
def edit_server(server_id):
    server = Server.query.get(server_id)
    if server:
        form = ServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(server)
            db.session.commit()
            return server.to_dict(), 200
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': "server not found"}, 404 




# delete a regular server
@server_routes.route('/regular/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    server = Server.query.filter(Server.id == server_id).first()

    if server is not None:
        db.session.delete(server)
        db.session.commit()
        return {"message": "server successfully deleted"}, 200
    else:
        return {"errors": "server not found"}, 404
        







