from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import Channel

class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    topic = StringField('topic')
    submit = SubmitField("Submit")
    
