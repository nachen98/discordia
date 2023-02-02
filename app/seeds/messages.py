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

    channel_msg_11 = Message(
        body='What do you guys listen to?',
        channel_id=2,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_12 = Message(
        body="I've been listening to a Kid Cudi",
        channel_id=2,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_13 = Message(
        body='Me too! Have guys seen his new movie, Entergalactic?',
        channel_id=2,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_14 = Message(
        body="Yeah, it was a great movie! That's why I started listening to more of it",
        channel_id=2,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_15 = Message(
        body='Sounds dope! I gotta watch it too now.',
        channel_id=2,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_16 = Message(
        body='Mmmmm. Cheeseburgers.',
        channel_id=3,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_17 = Message(
        body='Tacos for life!!!',
        channel_id=3,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_18 = Message(
        body='You have to try Carnitas el Momo in LA! It was featured on Netflix.',
        channel_id=3,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_19 = Message(
        body='Ooooo. Carnitas el Momo are some of the best tacos hand down!!!',
        channel_id=3,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_20 = Message(
        body='How many programmers does it take to change a light bulb?',
        channel_id=4,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_21 = Message(
        body="I don't know. How many?",
        channel_id=4,
        user_id=9,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_22 = Message(
        body="None – It’s a hardware problem.",
        channel_id=4,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_23 = Message(
        body='Haha good one!',
        channel_id=4,
        user_id=9,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_24 = Message(
        body="Why did the programmer quit his job?",
        channel_id=4,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_25 = Message(
        body='No clue. Why?',
        channel_id=4,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_26 = Message(
        body="Because he didn't get arrays.",
        channel_id=4,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_27 = Message(
        body='LOL!!!',
        channel_id=4,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_28 = Message(
        body='LMAOOOO. I love this channel.',
        channel_id=4,
        user_id=9,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_29 = Message(
        body="hahaha y'all are too much",
        channel_id=4,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_30 = Message(
        body="Welcome again guys. Feel free to share whatever here. Like your pets :)",
        channel_id=5,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_31 = Message(
        body="Say hello to my pet spider    ///\oo/\\\\\\",
        channel_id=5,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_32 = Message(
        body="lolol check out my fish",
        channel_id=5,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_33 = Message(
        body="><((((*>",
        channel_id=5,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_34 = Message(
        body="d-(^_^)-b",
        channel_id=5,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_35 = Message(
        body="( > ^_^) > < ( ^_^ < )",
        channel_id=5,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_36 = Message(
        body="Dracarys!!!",
        channel_id=6,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_37 = Message(
        body="Anybody seen Mushu? I think I might be in the wrong dragon server...",
        channel_id=6,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_38 = Message(
        body="Heh. I'm guessing Toothless isn't here.",
        channel_id=6,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_39 = Message(
        body="All dragons are welcome!!",
        channel_id=6,
        user_id=5,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_40 = Message(
        body="Haha I used to love AIM. It was the best back in the day",
        channel_id=7,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_41 = Message(
        body="Good ol days",
        channel_id=7,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_42 = Message(
        body="What was y'all screenname?",
        channel_id=7,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_43 = Message(
        body="xXd3m01i7i0nXx",
        channel_id=7,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_44 = Message(
        body="LOL mine was xXnAnCyXx",
        channel_id=7,
        user_id=9,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_45 = Message(
        body="LOL great minds think alike. AIM me xX_b0bby_Xx",
        channel_id=7,
        user_id=3,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_46 = Message(
        body="sTeViNaToR",
        channel_id=7,
        user_id=8,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_47 = Message(
        body="XOXO_LINDA_OXOX",
        channel_id=7,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_48 = Message(
        body="very original sreen names haha",
        channel_id=7,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_49 = Message(
        body="xD",
        channel_id=7,
        user_id=7,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_50 = Message(
        body="Kaizoku Oni Ore wa Naru",
        channel_id=8,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_51 = Message(
        body="God Usopp >>>",
        channel_id=8,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_52 = Message(
        body="LOL. Final showdown is God Usopp vs Buggy hahahah",
        channel_id=8,
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_53 = Message(
        body="hahaha. SogeKing FTW!!!",
        channel_id=8,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_54 = Message(
        body="Zoro is the GOAT!",
        channel_id=8,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_55 = Message(
        body="Who else is hyped up for this arc?!",
        channel_id=9,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_56 = Message(
        body="More like who isn't?!",
        channel_id=9,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_57 = Message(
        body="Stoked for gear 5!!",
        channel_id=9,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_58 = Message(
        body="Yoooo spoilers!",
        channel_id=9,
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_59 = Message(
        body="my bad my bad!",
        channel_id=9,
        user_id=10,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_60 = Message(
        body="All good! Just for those who haven't read the manga yet.",
        channel_id=9,
        user_id=4,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_61 = Message(
        body="I already read it so np here.",
        channel_id=9,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_62 = Message(
        body="LOL me too. I'm caught up. Just can't wait to see it animated.",
        channel_id=9,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now())

    channel_msg_63 = Message(
        body="Phew! Yaa. This year is gonna be lit for One Piece!",
        channel_id=9,
        user_id=10,
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
        body='Did you join my server?',
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

    dm_msg_7 = Message(
        body="Hey, thanks for letting me in the server!",
        server_id=8,
        user_id=5,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_8 = Message(
        body="No problem. Glad you're here. The more the merrier!",
        server_id=8,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_9 = Message(
        body="Yo, what you up to?",
        server_id=9,
        user_id=6,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    dm_msg_10 = Message(
        body="Not much. Just setting up the server. It's pretty easy.",
        server_id=9,
        user_id=1,
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
    db.session.add(channel_msg_11)
    db.session.add(channel_msg_12)
    db.session.add(channel_msg_13)
    db.session.add(channel_msg_14)
    db.session.add(channel_msg_15)
    db.session.add(channel_msg_16)
    db.session.add(channel_msg_17)
    db.session.add(channel_msg_18)
    db.session.add(channel_msg_19)
    db.session.add(channel_msg_20)
    db.session.add(channel_msg_21)
    db.session.add(channel_msg_22)
    db.session.add(channel_msg_23)
    db.session.add(channel_msg_24)
    db.session.add(channel_msg_25)
    db.session.add(channel_msg_26)
    db.session.add(channel_msg_27)
    db.session.add(channel_msg_28)
    db.session.add(channel_msg_29)
    db.session.add(channel_msg_30)
    db.session.add(channel_msg_31)
    db.session.add(channel_msg_32)
    db.session.add(channel_msg_33)
    db.session.add(channel_msg_34)
    db.session.add(channel_msg_35)
    db.session.add(channel_msg_36)
    db.session.add(channel_msg_37)
    db.session.add(channel_msg_38)
    db.session.add(channel_msg_39)
    db.session.add(channel_msg_40)
    db.session.add(channel_msg_41)
    db.session.add(channel_msg_42)
    db.session.add(channel_msg_43)
    db.session.add(channel_msg_44)
    db.session.add(channel_msg_45)
    db.session.add(channel_msg_46)
    db.session.add(channel_msg_47)
    db.session.add(channel_msg_48)
    db.session.add(channel_msg_49)
    db.session.add(channel_msg_50)
    db.session.add(channel_msg_51)
    db.session.add(channel_msg_52)
    db.session.add(channel_msg_53)
    db.session.add(channel_msg_54)
    db.session.add(channel_msg_55)
    db.session.add(channel_msg_56)
    db.session.add(channel_msg_57)
    db.session.add(channel_msg_58)
    db.session.add(channel_msg_59)
    db.session.add(channel_msg_60)
    db.session.add(channel_msg_61)
    db.session.add(channel_msg_62)
    db.session.add(channel_msg_63)

    db.session.add(dm_msg_1)
    db.session.add(dm_msg_2)
    db.session.add(dm_msg_3)
    db.session.add(dm_msg_4)
    db.session.add(dm_msg_5)
    db.session.add(dm_msg_6)
    db.session.add(dm_msg_7)
    db.session.add(dm_msg_8)
    db.session.add(dm_msg_9)
    db.session.add(dm_msg_10)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
