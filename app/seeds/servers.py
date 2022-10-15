# from app.models import db, Server

# def seed_servers():
#     reg_server_1 = Server(
#         name='test-server-1',
#         imageUrl='https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
#         isDm=False,
#         ownerId=1)

#     reg_server_2 = Server(
#         name='test-server-2',
#         imageUrl='https://sm.mashable.com/mashable_sea/photo/default/alexander-shatov-sifcjhruwpm-unsplash_vvnu.jpg',
#         isDm=False,
#         ownerId=2)

#     reg_server_3 = Server(
#         name='test-server-3',
#         imageUrl='https://m.media-amazon.com/images/I/51lpm9SpsJL.png',
#         isDm=False,
#         ownerId=3)

#     reg_server_4 = Server(
#         name='test-server-4',
#         # imageUrl='',
#         isDm=False,
#         ownerId=1)

#     # Server id 5
#     dm_server_1 = Server(
#         name='Demo-marnie',
#         isDm=True)

#     # Server id 6
#     dm_server_2 = Server(
#         name='Demo-bobbie',
#         isDm=True)

#     # Server id 7
#     dm_server_3 = Server(
#         name='marnie-bobbie',
#         isDm=True)

#     reg_server_1.serverUsers.append()

#     db.session.add(reg_server_1)
#     db.session.add(reg_server_2)
#     db.session.add(reg_server_3)
#     db.session.add(reg_server_4)
#     db.session.add(dm_server_1)
#     db.session.add(dm_server_2)
#     db.session.add(dm_server_3)

# def undo_servers():
#     db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
#     db.session.commit()
