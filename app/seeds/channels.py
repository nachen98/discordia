from app.models import db, Channel
from datetime import datetime

def seed_channels():
    server_1_channel_1 = Channel(
        name='welcome',
        topic='Greetings',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_2 = Channel(
        name='music',
        topic='Classic, pop, r&b',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_3 = Channel(
        name='food',
        topic='American, Mexican, Chinese',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_4 = Channel(
        name='coding',
        topic='Python, C++, Javascript, Java',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_5 = Channel(
        name='general',
        topic='Pets',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_6 = Channel(
        name='general',
        topic='Sports',
        is_voice=False,
        server_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_7 = Channel(
        name='general',
        topic='Yoga',
        is_voice=False,
        server_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_2_channel_1 = Channel(
        name='general',
        topic='Greetings',
        is_voice=False,
        server_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(server_1_channel_1)
    db.session.add(server_1_channel_2)
    db.session.add(server_1_channel_3)
    db.session.add(server_2_channel_1)
    db.session.add(server_1_channel_4)
    db.session.add(server_1_channel_5)
    db.session.add(server_1_channel_6)
    db.session.add(server_1_channel_7)
    
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()