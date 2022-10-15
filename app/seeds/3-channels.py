from app.models import db, Channel

def seed_channels():
    server_1_channel_1 = Channel(
        name='welcome',
        topic='greetings',
        isVoice=False,
        serverId=1
    )

    server_1_channel_2 = Channel(
        name='welcome',
        topic='greetings',
        isVoice=False,
        serverId=1
    )

    server_1_channel_3 = Channel(
        name='welcome',
        topic='greetings',
        isVoice=False,
        serverId=1
    )

    server_2_channel_1 = Channel(
        name='welcome',
        topic='greetings',
        isVoice=False,
        serverId=2
    )

    db.session.add(server_1_channel_1)
    db.session.add(server_1_channel_2)
    db.session.add(server_1_channel_3)
    db.session.add(server_2_channel_1)

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
