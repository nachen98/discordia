
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
import { addChannelMessage } from '../../store/channel'
import { addDmServerMessage } from '../../store/dmserver'
import { create_dm} from "../../store/messages"
import NoChannels from '../NoChannels';
import NoChatSelected from '../NoChatSelected';
let socket

const ChatBox = () => {

    console.log('chatbox rendering....');
    const {channelId} = useParams();
    const {serverId} = useParams();
    const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];
    console.log('get  server ,channel---- ',serverId , channelId);
    const [isLoaded, setLoaded]= useState(false)


    let isDmServer;

    const dispatch = useDispatch();
    const [currentServerId, setCurrentServerId] = useState(serverId)

    const channels = useSelector(state => state.channelReducer)
    const users = useSelector(state => state.usersReducer)
    const current_user = useSelector(state => state.session.user)
    const msg =Object.values(useSelector(state => state.messagesReducer))
    const allRegularServers = useSelector(state => state.regularServerReducer)
    const allDmServers = useSelector(state => state.dmServerReducer)
    const [messageInput, setMessageInput] = useState('')
    const [messageInputLengthErr, setMessageInputLengthErr] = useState('gray-text')

    useEffect(() => {
        if (messageInput.length <= 255 && messageInputLengthErr=== 'gray-text') return;
        if (messageInput.length > 255 && messageInputLengthErr === 'red-text') return;

        if (messageInput.length > 255 && messageInputLengthErr === 'gray-text') setMessageInputLengthErr('red-text')
        if (messageInput.length <= 255 && messageInputLengthErr ==='red-text') setMessageInputLengthErr('gray-text');

    }, [messageInput])

    useEffect(() => {
        // create websocket/connect
        socket = io();
        console.log('-===================== CREATE A NEW socket instance =====ChatBox=================-.', socket)
        socket.connect("http://localhost:5000")
        socket.on('connect', ()=>{
            console.log("socket in ChatBox connected -- value", socket.connected)
        });
        socket.on('disconnect', ()=>{
            console.log("socket in ChatBox disconnected ")
        });
        socket.on("connect_error", (err) => {
            console.log("connect_error in ChatBox: ", err)
            console.log(`connect_error in ChatBox due to ${err.message}`);
        });
        console.log("socket init..", socket)

        socket.on('hello', (data)=>{
            console.log("after receiving 1...", new Date())
            console.log("received message from server in Chatbox", data)
            console.log("received broadcast msg, socket id:", socket.id)
            console.log("c/////////// id ",data.channel_id )
            if (data.channel_id){
                dispatch(createChannelMessage(data));
                dispatch(addChannelMessage(data.id, data.channel_id));
                //dispatch(createChannelMessage(data));
            } else{
                console.log("c/////////// id ",data.channel_id)
                dispatch(create_dm(data));
                dispatch(addDmServerMessage(data.id, data.server_id));
            }
        console.log("after receiving 2...", new Date())
        })


        return (() => {
            socket.disconnect()
        })
    }, [])


    useEffect(() => {
        setLoaded(true);

    },[])


    useEffect(() => {
        if (!channelId) return;
        //dispatch(messageActions.loadDMServerMessagesByRecipintId(+recipintId));
        dispatch(messageActions.loadMessgesByChannelThunk(+channelId));
    },[dispatch,channelId]);



    // useEffect(() => {
    //     // if (isLoaded && isDmServer) {
    //     //     dispatch(messageActions.loadMessagesByDmServerId(+serverId));
    //     // }
    //     if (serverId === currentServerId) return;
    //     setCurrentServerId(serverId);

    // },[serverId]);


    useEffect(() => {
        const messageTextField = document.getElementById('send-message-textarea');
        if (! messageTextField) return

        console.log(" add event listener....")
        messageTextField.addEventListener('keydown', listenForEnter);
        return () => messageTextField.removeEventListener('keydown', listenForEnter);
    }, [])

    useEffect(() => {
        const messages = document.querySelectorAll('.channel-message-container')

        if (!messages.length) return;

        messages[messages.length - 1].scrollIntoView()

    })


    if (!serverId && !isLoaded) {

        return (<span>Loading...</span>)
    }

    if (!channelId && !serverId){
        console.log("--------------");
        return <NoChatSelected />
    }

    const currentServer = allRegularServers[serverId] ? allRegularServers[serverId] : allDmServers[serverId]

    if (currentServer){
        console.log("current server is --", currentServer);
        isDmServer = currentServer.is_dm
    }


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
        if (messageInput.trim().length === 0) return;

        if (messageInput.length > 255) {
            alert(`255 characters max. Your message was ${messageInput.length} characters long.`);
            return;
        }

        console.log("status of socket", socket.connected)
        let time1 = new Date();
        let data = {
            "sender_id": current_user.id,
            "is_channel_message": true,
            "channel_id": channelId,
            "body": messageInput
            }
        socket.send('message', data);
        let time2= new Date();
        console.log("sending data----", data)
        console.log("sending data time", time2-time1 ,"ms")
        setMessageInput('');
    }

    if (isDmServer && isLoaded){
        const dmMessages = msg.filter(message=> parseInt(message.server_id) === parseInt(serverId));
        return <DmChatBox  socket={socket} dmMessages={dmMessages}/>
    }

    // if (!isLoaded ){
    //     return (<span>Loading...</span>)
    // }

    const channel = channels[channelId]
    if (!channel || !channel.messages){
        return <NoChannels />
    }


    let messageArr = msg
    const dateObj = {}
    for (let i=0; i< messageArr.length;i++){
        if (messageArr[i].channel_id === null || messageArr[i].channel_id !== +channelId ) continue;
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
    console.log("channel message dataObj: ", messageArr)
    console.log("channel message reducer: ", msg);
    console.log("dataObj--users" ,users);
    const messageContainer = Object.keys(dateObj).map((key, index) =>{
        return (
            <div key = {index} className='all-messages-container'>
                    <div className='date-divider'> {getMonthYear(key)}</div>
                    {  dateObj[key].sort((a,b) =>a.id-b.id).map((item, idx) =>{
                        const colorInd = item.user_id % COLORS.length;
                        return (
                            <div key = {idx} className="channel-message-container">
                                <div className={`channel-message-user-profile-image-container ${COLORS[colorInd]}-bg flx-row-justify-align-ctr`}>
                                    <img className={`channel-message-user-profile-image`} src={"/assets/discordia-mascot.png"} alt={"bb"}/>
                                </div>
                                <div className="channel-message-detail">
                                    <div className='channel-message-info'>
                                        <div className='channel-message-user-fullname'>  {users[item.user_id].username}  </div>
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
            <div id='chat-nav' className='flx-row-align-ctr'>
                <i className="fa-solid fa-hashtag"></i>
                <div id='channel-name'>{channel.name}</div>
                <div id='divider'>{!!channel.topic && '|' }</div>
                <div id='channel-topic'>
                    {!!channel.topic && channel.topic}
                </div>

            </div>

            <div id='chat-window' className='flx-col'>
                <div id='message-window'>
                    {messageContainer}
                </div>

                <div id='message-input-container' className='flx-col'>
                    <form id='send-message-form' className='flx-row-justify-ctr'>
                        <textarea
                        className='flx-col'
                        id='send-message-textarea'
                        placeholder={`Message @${channel.name}`}
                        rows='1'
                        onChange={handleMessageInput}
                        value={messageInput}
                        onKeyDown={listenForEnter}
                        />
                    <button type='submit' id='send-message-btn' style={{display: 'none'}} />
                    </form>
                    <span className={`${messageInputLengthErr} message-char-count`}>{255 - messageInput.length} </span>
                </div>
            </div>

            <div id='five-px-divider'></div>

            <UsersListSidebar  socket={socket} />
        </div>
    )
}

export default ChatBox
