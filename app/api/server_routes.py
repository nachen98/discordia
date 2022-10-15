from flask import Blueprint


server_routes = Blueprint('servers', __name__, '/servers')



@server_routes.route('/regular/current')
def get_regular_servers():
    user = request.getuser # get user id from request
    server = Server.query.all() # TODO to query from join table
    return {'users': [user.to_dict() for user in users]}

@server_routes.rout('')


