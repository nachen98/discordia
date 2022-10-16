from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = StringField('profile_pic')
    submit = SubmitField("Submit")