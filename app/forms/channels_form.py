from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Channel

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    topic = StringField('topic')
    
