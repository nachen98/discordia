
import { useEffect, useState } from 'react'
import UsersListSidebar from '../UsersListSidebar'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import './ChatBox.css'
import { io } from "socket.io-client";
import { loadMessgesByChannelThunk } from "../../store/messages"
import {createChannelMessage } from "../../store/messages"
import profileimage from './profileimage.png'
import { getMonthYear } from '../../utils/helper';


const ChatBox = ({socket}) => {
    //let socket;

    //TODO hard coded
    let {channelId} = useParams();
    const {serverId} = useParams()

    channelId = 1
    //const
    console.log("get socket from main component ..", socket)
    
    // if  channel message added, will also update state.channelReducer-----
    const dispatch = useDispatch();

    const channels = useSelector(state => state.channelReducer)
    //TODO update action in reduce for changing message array to message id array
    const users = Object.values(useSelector(state => state.usersReducer))
    const current_user = useSelector(state => state.session.user)
    const msg = Object.values(useSelector(state => state.messagesReducer))

    useEffect(() => {
        console.log("useEffect running")
        dispatch(loadMessgesByChannelThunk(+channelId));
    },[dispatch]);

    const [messageInput, setMessageInput] = useState('')


    const listenForEnter = (e) => {
        console.log("eeeeeeee", e.keyCode )
        if (e.key === "Enter") {
            console.log("something here1")
            handleMessageSubmit(e);
            
        }
    }


    useEffect(() => {
        const messageTextField = document.getElementById('send-message-textarea');
        if (! messageTextField){
            return
        }
        messageTextField.addEventListener('keydown', listenForEnter);

        return () => messageTextField.removeEventListener('keydown', listenForEnter);
    }, [])


    const handleMessageInput = (e) => {
        setMessageInput(e.target.value)
    }

    const handleMessageSubmit = async (e) => {
       e.preventDefault();
       console.log("status of socket", socket.connected)
       socket.send('message', 
        {   
                "sender_id": current_user.id, 
                "is_channel_message": true, 
                "channel_id": channelId, 
                "body": messageInput 
        })
        socket.on('hello', (data)=>{
            console.log("received message from server", data)
            dispatch(createChannelMessage(data))
            setMessageInput("")
        })
         
    }
   
    const channel = channels[channelId]
    
    if (!channel || !channel.messages){
        
        return <span>Loading... </span>
    }

   
    let messageArr = Object.values(msg)
    const dateObj = {}
    for (let i=0; i< messageArr.length;i++){
        if (messageArr[i].channel_id === null || messageArr[i].channel_id !== channelId ) continue;
        let created_date = messageArr[i].created_at.substring(0,10)
        if ( Object.keys(dateObj).includes(created_date)){
            dateObj[created_date].push(messageArr[i])
        }
        else{
            let newArr = []
            dateObj[created_date] = newArr
            newArr.push(messageArr[i])
        }
    }
    console.log("dataObj: ", dateObj)
    
    const messageContainer = Object.keys(dateObj).map((key, index) =>{
        return (
            <div key = {index} className='all-messages-container'>
                    <div className='date-divider'> {getMonthYear(key)}</div>
                    {  dateObj[key].sort((a,b) =>a.id-b.id).map((item, idx) =>{
                        return (
                            <div key = {idx} className="channel-message-container">
                                <img className='channel-message-user-profile-image'src={profileimage} alt={"bb"}/>
                                <div className="channel-message-detail"> 
                                    <div className='channel-message-info'>
                                      <div className='channel-message-user-fullname'>  user : {item.user_id}  </div>
                                      <div className="channel-message-created-date"> {new Date(item.created_at).toLocaleDateString()} </div>
                                    </div>
                                    <div className="channel-message-body" > {item.body}</div>
                                </div>
                            </div>  
                            )
                        })
                    }       
            </div>   
        )
    })


    return (
        <div id='main-chat' className='flx-row'>
            <div id='chat-nav' className='flx-row-align-ctr'>Channel name and (optional) topic goes here</div>

            <div id='chat-window' className='flx-col'>
                <div id='message-window'>
                    {messageContainer}
                   
                </div>

                <div id='message-input-container' className='flx-col'>
                    <form id='send-message-form' className='flx-row-justify-ctr'>
                        <textarea
                        className='flx-col'
                        id='send-message-textarea'
                        placeholder={`Message <channel or username(DM) name goes here>`}
                        rows='1'
                        onChange={handleMessageInput}
                        value={messageInput}
                        onKeyDown={listenForEnter}
                        />
                    <button type='submit' id='send-message-btn' style={{display: 'none'}} />
                    </form>
                    <span className='message-char-count'>{255 - messageInput.length}</span>
                </div>
            </div>

            <UsersListSidebar />
        </div>
    )
}

export default ChatBox
