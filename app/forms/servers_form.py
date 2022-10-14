from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    imageUrl = StringField('profile_pic')