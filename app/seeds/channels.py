from app.models import db, Channel
from datetime import datetime

def seed_channels():
    server_1_channel_1 = Channel(
        name='welcome',
        topic='greetings',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_2 = Channel(
        name='welcome',
        topic='greetings',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_3 = Channel(
        name='welcome',
        topic='greetings',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_2_channel_1 = Channel(
        name='welcome',
        topic='greetings',
        is_voice=False,
        server_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(server_1_channel_1)
    db.session.add(server_1_channel_2)
    db.session.add(server_1_channel_3)
    db.session.add(server_2_channel_1)

    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
