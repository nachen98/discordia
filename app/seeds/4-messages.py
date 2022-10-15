from app.models import db, Message

def seed_messages():
    channel_msg_1 = Message(
        body='Hi there buddy',
        channelId='1',
        userId=1)

    channel_msg_2 = Message(
        body='Hello :)',
        channelId='1',
        userId=2)

    channel_msg_3 = Message(
        body='Welcome to my server',
        channelId='2',
        userId=1)

    channel_msg_4 = Message(
        body='Cool!',
        channelId='2',
        userId=3)

    dm_msg_1 = Message(
        body='Thanks for joining the server',
        serverId=5,
        userId=1)

    dm_msg_2 = Message(
        body='Glad to be part of it!',
        serverId=5,
        userId=2)

    dm_msg_3 = Message(
        body='Want to join my server?',
        serverId=6,
        userId=1
    )

    dm_msg_4 = Message(
        body='Sure! I would love to!',
        serverId=6,
        userId=3
    )

    dm_msg_5 = Message(
        body='Did you join Demo\'s server?',
        serverId=7,
        userId=2
    )

    dm_msg_6 = Message(
        body='Yep!!',
        serverId=7,
        userId=3
    )

    db.session.add(channel_msg_1)
    db.session.add(channel_msg_2)
    db.session.add(channel_msg_3)
    db.session.add(channel_msg_4)
    db.session.add(dm_msg_1)
    db.session.add(dm_msg_2)
    db.session.add(dm_msg_3)
    db.session.add(dm_msg_4)
    db.session.add(dm_msg_5)
    db.session.add(dm_msg_6)

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
