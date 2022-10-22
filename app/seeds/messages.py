from app.models import db, Message
from datetime import datetime

def seed_messages():
    channel_msg_1 = Message(
        body='Hi there buddy',
        channel_id='1',
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_2 = Message(
        body='Hello :)',
        channel_id='1',
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_3 = Message(
        body='Glad to be on this channel',
        channel_id='1',
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_4 = Message(
        body='What would you like to talk about here?',
        channel_id='1',
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_5 = Message(
        body='I am very interested in the food channel',
        channel_id='1',
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now())
    
    channel_msg_6 = Message(
        body='Nice to see everyone here!',
        channel_id='1',
        user_id=5,
        created_at=datetime.now(),
        updated_at=datetime.now())
    
    channel_msg_7 = Message(
        body='Where do you guys hang out?',
        channel_id='1',
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now())
    
    channel_msg_8 = Message(
        body='I come from UK.',
        channel_id='1',
        user_id=5,
        created_at=datetime.now(),
        updated_at=datetime.now())
    
    channel_msg_9 = Message(
        body='Welcome to my server',
        channel_id='2',
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_10 = Message(
        body='Cool!',
        channel_id='2',
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    dm_msg_1 = Message(
        body='Thanks for joining the server',
        server_id=5,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    dm_msg_2 = Message(
        body='Glad to be part of it!',
        server_id=5,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    dm_msg_3 = Message(
        body='Want to join my server?',
        server_id=6,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_4 = Message(
        body='Sure! I would love to!',
        server_id=6,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_5 = Message(
        body='Did you join Demo\'s server?',
        server_id=7,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_6 = Message(
        body='Yep!!',
        server_id=7,
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(channel_msg_1)
    db.session.add(channel_msg_2)
    db.session.add(channel_msg_3)
    db.session.add(channel_msg_4)
    db.session.add(channel_msg_5)
    db.session.add(channel_msg_6)
    db.session.add(channel_msg_7)
    db.session.add(channel_msg_8)
    db.session.add(channel_msg_9)
    db.session.add(channel_msg_10)
   
    db.session.add(dm_msg_1)
    db.session.add(dm_msg_2)
    db.session.add(dm_msg_3)
    db.session.add(dm_msg_4)
    db.session.add(dm_msg_5)
    db.session.add(dm_msg_6)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
