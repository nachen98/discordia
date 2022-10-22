from gc import callbacks
import os,json
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user

from .models import db, User, Server, Channel, Message
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channel_routes import channel_routes
from flask_socketio import SocketIO, send, emit, send

from .forms import ServerForm
from datetime import datetime


from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


origins = "*"
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        "http://discordia-cgh.herokuapp.com",
        "https://discordia-cgh.herokuapp.com"
    ]

socketio = SocketIO(app, cors_allowed_origins=origins)




# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# return dm server and message info if there is, otherwise create a dm server then return
@app.route('/api/dmservermessages/<int:to_user_id>')
def get_dm_server_message(to_user_id):

    cur_user_id = current_user.id
    print("------------------ id", cur_user_id, to_user_id)

    server_name = str(cur_user_id)+'-'+str(to_user_id) if cur_user_id<to_user_id else str(to_user_id)+'-'+str(cur_user_id)
    server = Server.query.filter(Server.name == server_name).first()
    if server :
        return {"result" : server.to_dict_dm_server()}, 200
    else :
        new_dm_server = Server()
        new_dm_server.name = server_name
        new_dm_server.is_dm = True
        new_dm_server.created_at = datetime.now()
        new_dm_server.updated_at = datetime.now()
        db.session.add(new_dm_server)
        db.session.commit()
        cur_user = User.query.filter(User.id == cur_user_id).first()
        to_user = User.query.filter(User.id == to_user_id).first()

        print ("-----------backend current user ", to_user)
        print ("--------------backend to user ", cur_user)
        new_dm_server.server_users.append(cur_user)
        new_dm_server.server_users.append(to_user)
        db.session.commit()
        print ("new dm server instance ", new_dm_server.to_dict_dm_server())
        return {"result" : new_dm_server.to_dict_dm_server()}, 200




@app.route('/api/messages/<int:dm_server_id>')
def get_messages_by_dm_id(dm_server_id):
    server = Server.query.filter(Server.id == dm_server_id).first()
    if server :
        return {"result" : server.to_dict_dm_server()}, 200
    else:
        return {'errors': "dm_server not found"}, 404 




@socketio.on('connect')
def handle_connect(data):
    print("~~~~~~!!!!!!")



@socketio.on('message')
def handle_direct_chat(message, data):
    print ("data----", data)
    print ("begin 1 ----", datetime.now())
    message = Message()
    if data["is_channel_message"]:
        message.channel_id =data['channel_id']
    else:   
        message.server_id = data['dm_server_id']
        
    message.user_id =data['sender_id']
    message.body =data['body']
    message.created_at = datetime.now()
    message.updated_at = datetime.now()
    
    # name_space = data['name-space']

    db.session.add(message)
    db.session.commit()
    # print ("receive data 1", direct_message.to_dict())
    print ("begin 2 ----", datetime.now())
    socketio.emit("hello", message.to_dict(), broadCast=True)
    print ("begin 3 ----", datetime.now())
    

# @socketio.on('test')
# def handle_test(data):
    
#     print ("receive data 2", data)
#     socketio.emit("hello", data, namespace='/chat')


# def ack():
#     print('message was received!')
    
#     #emit('direct_message', data, broadcast=True)




# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    socketio.run(app)
