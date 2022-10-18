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
        name='music',
        topic='classic, pop, r&b',
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
        topic='python, C++, Javascript, Java',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_5 = Channel(
        name='pets',
        topic='cats, dogs, fish, bunnies',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_6 = Channel(
        name='sports',
        topic='fencing, baseball, basketball, soccer',
        is_voice=False,
        server_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    server_1_channel_7 = Channel(
        name='books',
        topic='fables, classics, fiction, adventure stories',
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
    db.session.add(server_1_channel_4)
    db.session.add(server_1_channel_5)
    db.session.add(server_1_channel_6)
    db.session.add(server_1_channel_7)
    
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
