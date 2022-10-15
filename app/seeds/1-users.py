from app.models import db, User, Server


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    # db.session.commit()

    # Add in servers here so that the server objects
    # will have access to user objects
    reg_server_1 = Server(
        name='test-server-1',
        imageUrl='https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        isDm=False,
        ownerId=1)

    reg_server_2 = Server(
        name='test-server-2',
        imageUrl='https://sm.mashable.com/mashable_sea/photo/default/alexander-shatov-sifcjhruwpm-unsplash_vvnu.jpg',
        isDm=False,
        ownerId=2)

    reg_server_3 = Server(
        name='test-server-3',
        imageUrl='https://m.media-amazon.com/images/I/51lpm9SpsJL.png',
        isDm=False,
        ownerId=3)

    reg_server_4 = Server(
        name='test-server-4',
        # imageUrl='',
        isDm=False,
        ownerId=1)

    # Server id 5
    dm_server_1 = Server(
        name='Demo-marnie',
        isDm=True)

    # Server id 6
    dm_server_2 = Server(
        name='Demo-bobbie',
        isDm=True)

    # Server id 7
    dm_server_3 = Server(
        name='marnie-bobbie',
        isDm=True)

    reg_server_1.serverUsers.append(demo)
    reg_server_1.serverUsers.append(marnie)
    reg_server_1.serverUsers.append(bobbie)

    dm_server_1.serverUsers.append(demo)
    dm_server_1.serverUsers.append(marnie)

    dm_server_2.serverUsers.append(demo)
    dm_server_2.serverUsers.append(bobbie)

    dm_server_3.serverUsers.append(marnie)
    dm_server_3.serverUsers.append(bobbie)

    db.session.add(reg_server_1)
    db.session.add(reg_server_2)
    db.session.add(reg_server_3)
    db.session.add(reg_server_4)
    db.session.add(dm_server_1)
    db.session.add(dm_server_2)
    db.session.add(dm_server_3)



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
