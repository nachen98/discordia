
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createDmServer } from '../../store/dmserver';
import { create_dm } from '../../store/messages';

import './DmUserPopUp.css'

const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];

const DmUserPopUp = ({ setShowDmPopUp, socket, userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.usersReducer)
    const allDmServers = useSelector(state => state.dmServerReducer)
    const allDmServersArr = Object.values(useSelector(state => state.dmServerReducer))

    const [dmMessage, setDmMessage] = useState('');

    const selectedUser = allUsers[+userId]
    const colorInd = COLORS[userId % COLORS.length];

    let dmServer = allDmServersArr.find((server) => {
        if(
            server.name === `${sessionUser.id}-${userId}`
            ||
            server.name === `${userId}-${sessionUser.id}` ){
                return true;
            }
    })

    // useEffect(() => {
    //     const dmPopup = document.getElementById('dm-user-pop-up');

    //     const stopClose = e => {
    //         e.stopPropagation();
    //         console.log('e from the dm UserPopup is ', e.target.className)
    //         console.log('classname includes dm-pop-up-ele? :', e.target.className.includes('dm-pop-up-ele'))
    //         setShowDmPopUp(true)
    //     }

    //     dmPopup.addEventListener('click', stopClose)

    //     return () => {
    //         dmPopup.removeEventListener('click', stopClose)

    //     }
    // }, [])

    const handleSendDm = (e) => {
        if (e) e.preventDefault();

        if (!dmMessage.trim().length) return;
        if (dmMessage.length > 255) return alert(`255 characters max. Your message was ${dmMessage.length} characters long.`)

        if (dmServer) {
            socket.send('message', {
                "sender_id": sessionUser.id,
                "is_channel_message": false,
                "dm_server_id": dmServer.id,
                "body": dmMessage
            })
            history.push(`/channels/${dmServer.id}`)
            // console.log('made it here?')
            // socket.on('hello', (data) => {
            //     console.log('data received back from socket is ', data)
            //     dispatch(create_dm(data))
            //     history.push(`/channels/${dmServer.id}`)
            //     return;
            // })
        }

        if (!dmServer) {
            // alert('Wait up... Need to create a dm server between you two')

            const dmServerName = `${sessionUser.id}-${userId}`;
            console.log(dmServerName)
            dispatch(createDmServer(dmServerName))
                .then((newServer) => {
                    socket.send('message', {
                        "sender_id": sessionUser.id,
                        "is_channel_message": false,
                        "dm_server_id": newServer.id,
                        "body": dmMessage});
                        return newServer
                    // socket.on('hello', (data) => {
                    //     dispatch(create_dm(data))
                    //     history.push(`/channels/${newServer.id}`)
                    //     return;
                    // })
                })
                    .then((newServer) => history.push(`/channels/${newServer.id}`))
        }

    }


    return (
        <div id='dm-user-pop-up' className='dm-user-pop-up-container pos-abs flx-col dm-pop-up-ele'>
            <div className={`user-popup-banner ${colorInd}-bg dm-pop-up-ele`} />

            <div className='profile-pic-bg pos-abs flx-row-justify-align-ctr dm-pop-up-ele'>
                <div className={`${colorInd}-bg pop-up-profile-img-container flx-row-justify-align-ctr dm-pop-up-ele`}>
                    <img className='pop-up-profile-img dm-pop-up-ele' src='/assets/discordia-mascot.png'/>
                </div>
            </div>

            <div id='dm-pop-up__user-profile' className='flx-col dm-pop-up-ele'>
                <div id='dm-pop-up__username' className='dm-pop-up-ele'>
                    {selectedUser.username}
                </div>

                {selectedUser.id === sessionUser.id &&
                    <img id='spiderman' className='dm-pop-up-ele' alt='talking-to-yourself' src='https://i.imgur.com/X1JLM7l.jpg' />
                }

                {selectedUser.id !== sessionUser.id && (
                <>
                    <div id='send-user-a-msg' className='dm-pop-up-ele'>Send {selectedUser.username} a direct message!</div>

                    <form id='send-dm' className='flx-row-justify-align-ctr dm-pop-up-ele' onSubmit={handleSendDm}>
                        <input
                            className='send-dm-input dm-pop-up-ele'
                            placeholder={`Message @${selectedUser.username}`}
                            onChange={(e) => setDmMessage(e.target.value)}
                        />
                    </form>
                </>)}
            </div>

        </div>
    )


}

export default DmUserPopUp
