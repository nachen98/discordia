
import { useEffect, useState } from 'react'
import UsersListSidebar from '../UsersListSidebar'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import './ChatBox.css'
import { io } from "socket.io-client";
import * as messageActions  from "../../store/messages"
import {createChannelMessage } from "../../store/messages"
import profileimage from './profileimage.png'
import { getMonthYear } from '../../utils/helper';
import DmChatBox from './DmChatBox';


const ChatBox = ({socket}) => {
    //let socket;

    console.log('chatbox rendering....');
    const {channelId} = useParams();
    const {serverId} = useParams();
    console.log('get  server ,channel---- ',serverId , channelId);
    const [isLoaded, setLoaded]= useState(false)
  
    let isDmServer;
    //const
    console.log("get socket from main component ..", socket)
  
    const dispatch = useDispatch();
    const [currentServerId, setCurrentServerId] = useState(serverId)

    const channels = useSelector(state => state.channelReducer)
    const users = Object.values(useSelector(state => state.usersReducer))
    const current_user = useSelector(state => state.session.user)
    const msg = Object.values(useSelector(state => state.messagesReducer))
    const allRegularServers = useSelector(state => state.regularServerReducer)
    const allDmServers = useSelector(state => state.dmServerReducer)
    const [messageInput, setMessageInput] = useState('')

    

    useEffect(() => {
        if (!channelId) return;
        //dispatch(messageActions.loadDMServerMessagesByRecipintId(+recipintId));
        dispatch(messageActions.loadMessgesByChannelThunk(+channelId));
    },[dispatch]);



    // useEffect(() => {
    //     // if (isLoaded && isDmServer) {
    //     //     dispatch(messageActions.loadMessagesByDmServerId(+serverId));
    //     // }
    //     if (serverId === currentServerId) return;
    //     setCurrentServerId(serverId);

    // },[serverId]);


    useEffect(() => {
        const messageTextField = document.getElementById('send-message-textarea');
        if (! messageTextField){
            return
        }
        console.log(" add event listener....")
        messageTextField.addEventListener('keydown', listenForEnter);
        return () => messageTextField.removeEventListener('keydown', listenForEnter);
    }, [])



    if (!serverId && !isLoaded) {
        setLoaded(true);
        return (<span>Loading...</span>)
    }

    if (!channelId && !serverId){
        console.log("--------------");
        return <div >Ready to send a message to friends? </div>
    }

    const currentServer = allRegularServers[serverId] ? allRegularServers[serverId] : allDmServers[serverId]

    isDmServer = currentServer.is_dm

    const listenForEnter = (e) => {
        if (e.key === "Enter") {
            handleMessageSubmit(e);
        }
    }

    const handleMessageInput = (e) => {
        setMessageInput(e.target.value)
    }

    const handleMessageSubmit = async (e) => {
       e.preventDefault();
       console.log("status of socket", socket.connected)
       console.log("before sending...", new Date())
       socket.send('message', 
        {   
            "sender_id": current_user.id, 
            "is_channel_message": true, 
            "channel_id": channelId, 
            "body": messageInput 
        })
        console.log("after sending...", new Date())
        socket.on('hello', (data)=>{
            console.log("after receiving 1...", new Date())
            console.log("received message from server", data)
            console.log("received broadcast msg, socket id:", socket.id) 
            dispatch(createChannelMessage(data))
            console.log("after receiving 2...", new Date())
            setMessageInput("")
            console.log("after receiving 3...", new Date())
        })     
    }

    if (isDmServer && isLoaded){
        const dmMessages = msg.filter(message=> parseInt(message.server_id) === parseInt(serverId));
        return <DmChatBox  socket={socket} dmMessages={dmMessages}/>
    } 
   
     const channel = channels[channelId]
    // if (!channel || !channel.messages){  
    //     return <span>Loading................... </span>
    // }

   
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
                                      <div className='channel-message-user-fullname'>  user : {users[item.user_id].username}  </div>
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
        <div id='channel-main-chat' className='flx-row'>
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

            <UsersListSidebar  socket={socket} />
        </div>
    )
 }

export default ChatBox
