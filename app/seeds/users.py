from app.models import db, User, Server
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        first_name='Demo',
        last_name='Lition',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        first_name='marnie',
        last_name='doe',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        first_name='bobbie',
        last_name='brown',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    mary = User(
        username='mary',
        email='mary@aa.io',
        first_name='mary',
        last_name='thomas',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    james = User(
        username='james',
        email='james@aa.io',
        first_name='james',
        last_name='robert',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    john = User(
        username='john',
        email='john@aa.io',
        first_name='john',
        last_name='black',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    linda = User(
        username='linda',
        email='linda@aa.io',
        first_name='linda',
        last_name='lee',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    steven = User(
        username='steven',
        email='steven@aa.io',
        first_name='steven',
        last_name='cain',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    nancy= User(
        username='nancy',
        email='nancy@aa.io',
        first_name='nancy',
        last_name='adams',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())
    betty = User(
        username='betty',
        email='betty@aa.io',
        first_name='betty',
        last_name='clark',
        password='password',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mary)
    db.session.add(james)
    db.session.add(john)
    db.session.add(linda)
    db.session.add(steven)
    db.session.add(nancy)
    db.session.add(betty)

    db.session.commit()

    # Add in servers here so that the server objects
    # will have access to user objects
    reg_server_1 = Server(
        name='Discordia',
        image_url='https://i.imgur.com/7b306JP.jpg',
        is_dm=False,
        owner_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    reg_server_2 = Server(
        name='House Targaryen',
        image_url='https://i.imgur.com/hRNuKfd.png',
        is_dm=False,
        owner_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    reg_server_3 = Server(
        name='AIM',
        image_url='https://i.imgur.com/b12S9th.png',
        is_dm=False,
        owner_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    reg_server_4 = Server(
        name='Strawhat Pirates',
        image_url='https://i.imgur.com/4YsCCXc.png',
        is_dm=False,
        owner_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    # Server id 5
    dm_server_1 = Server(
        name='1-2',
        is_dm=True,
        created_at=datetime.now(),
        updated_at=datetime.now())

    # Server id 6
    dm_server_2 = Server(
        name='1-3',
        is_dm=True,
        created_at=datetime.now(),
        updated_at=datetime.now())

    # Server id 7
    dm_server_3 = Server(
        name='1-4',
        is_dm=True,
        created_at=datetime.now(),
        updated_at=datetime.now())

    dm_server_4 = Server(
        name='1-5',
        is_dm=True,
        created_at=datetime.now(),
        updated_at=datetime.now())

    dm_server_5 = Server(
        name='1-6',
        is_dm=True,
        created_at=datetime.now(),
        updated_at=datetime.now())

    reg_server_1.server_users.append(demo)
    reg_server_1.server_users.append(marnie)
    reg_server_1.server_users.append(bobbie)
    reg_server_1.server_users.append(mary)
    reg_server_1.server_users.append(james)
    reg_server_1.server_users.append(john)
    reg_server_1.server_users.append(linda)
    reg_server_1.server_users.append(steven)
    reg_server_1.server_users.append(nancy)
    reg_server_1.server_users.append(betty)

    reg_server_2.server_users.append(demo)
    reg_server_2.server_users.append(marnie)
    reg_server_2.server_users.append(bobbie)
    reg_server_2.server_users.append(james)

    reg_server_3.server_users.append(demo)
    reg_server_3.server_users.append(steven)
    reg_server_3.server_users.append(nancy)
    reg_server_3.server_users.append(bobbie)
    reg_server_3.server_users.append(linda)

    reg_server_4.server_users.append(demo)
    reg_server_4.server_users.append(betty)
    reg_server_4.server_users.append(john)
    reg_server_4.server_users.append(mary)

    dm_server_1.server_users.append(demo)
    dm_server_1.server_users.append(marnie)

    dm_server_2.server_users.append(demo)
    dm_server_2.server_users.append(bobbie)

    dm_server_3.server_users.append(demo)
    dm_server_3.server_users.append(mary)

    dm_server_4.server_users.append(demo)
    dm_server_4.server_users.append(james)

    dm_server_5.server_users.append(demo)
    dm_server_5.server_users.append(john)

    db.session.add(reg_server_1)
    db.session.add(reg_server_2)
    db.session.add(reg_server_3)
    db.session.add(reg_server_4)
    db.session.add(dm_server_1)
    db.session.add(dm_server_2)
    db.session.add(dm_server_3)
    db.session.add(dm_server_4)
    db.session.add(dm_server_5)

    db.session.commit()

# seed_users()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
