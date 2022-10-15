from flask import Blueprint, request, jsonify
from itsdangerous import json
from app.models import Server, Channel, User,db
from app.forms import ServerForm, ChannelForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages


server_routes = Blueprint('servers', __name__)

# create new channel with server_id
@server_routes.route('/<int:server_id>/channels', methods=['POST'])
@login_required
def create_channel():

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (form.validate_on_submit()):
        channel = Channel()
        form.populate_obj(channel)
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# get all regular server associated with current user
@server_routes.route('/regular/current')
@login_required
def get_regular_servers():

    user_id = current_user.id
    result = db.session.query(Server.id, Server.name, Server.image_url, Server.is_dm, Server.create_at).\
        join(User_server).filter(Server.is_dm == False, User_server.user_id == user_id).all()
    
    if result is not None:
        return jsonify(result)
    else:
        return {"error" : "server not found"}, 404


# get all dm(direct message) servers associated with current user
@server_routes.route('/dm/current')
@login_required
def get_dm_servers():
    user_id = current_user.id
    result = db.session.query(Server.id, Server.name, Server.image_url, Server.is_dm, Server.create_at).\
        join(User_server).filter(Server.is_dm == True, User_server.user_id == user_id).all()
    
    if result is not None:
        return jsonify(result)
    else:
        return {"error" : "dm server not found"}, 404


# get regular server details by id
@server_routes.route('/<int:server_id>')
@login_required
def get_server_by_id(server_id):
    # server = Server.query.get(server_id)
    # channles = Channel.query.filter(Channel.server_id == server_id)
    # users = db.session.query(User.id, User.first_name, User.last_name, User.email, User.username, User.profile_pic_url).\
    #     join(User_server).filter(User.id == User_server.user_id, User_server.server_id == server_id)
    
    # ###### TODO ## combine them together
    return None 


# create a regular server
@server_routes.route('/regular', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        server = Server()
        form.populate_obj(server)
        server.owner_id = current_user.id
        db.session.add(server)
        db.session.commit()
        return jsonify(server)
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# edit a regular server
@server_routes.route('/regular/<int:server_id>', methods=['PUT'])
@login_required
def edit_server():
    # TODO get form data
    pass


# delete a regular server
@server_routes.route('/regular/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    server = Server.query.filter(Server.id == server_id).first()

    if server is not None:
        db.session.delete(server)
        db.session.commit()
        return {"message": "Successfully deleted"},200
    else:
        return {"errors": "server not found"}, 404
        







