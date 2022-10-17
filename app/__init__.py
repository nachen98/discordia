import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Server, Channel
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channel_routes import channel_routes
from flask_socketio import SocketIO, send, emit

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

socketio = SocketIO(cors_allowed_origins=origins)




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
print("test------")


@app.route('/index', methods=['GET', 'POST'])
def index():
    # form = ServerForm()
    # if form.validate_on_submit():
    #     print('hi there')
    # return render_template("index.html", form=form)
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('hi there')
        # name = form.data['name']
        # print('form name ', name)
        # if form['image_url']:
        #     print( "EMPTY")
        #     image_url = form.data['image_url']
        # if form['image_url'] is None:
        #     print(" None")
        server = Server()
        form.populate_obj(server)
        server.is_dm = False
        server.owner_id = 3
        server.created_at = datetime.now()
        server.updated_at = datetime.now()
       
        db.session.add(server)
        db.session.commit()

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


    if form.errors:
        return {'errors': form.errors}, 400

    return render_template("index.html", form=form)


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
