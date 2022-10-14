from flask import Blueprint


channel_routes = Blueprint('channels', __name__, url_prefix('/channels'))


@channel_routes.route('/<int:channel_id>')
def get_channel():
    return Channel.query.get(int(channel_id))
    return {'channel': channel.to_dict()}
    pass



@channel_routes.route('/', methods=['POST'])
def create_channel():
    form = ChannelForm()
    if (form.validate_on_submit()):
        data = Channel()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return redirect("/")
    raise Exception

