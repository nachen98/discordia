import { useSelector ,useDispatch} from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMonthYear } from "../../utils/helper";
import { create_dm} from "../../store/messages"

const DmChatBox = ({dmMessages, socket}) =>{

    console.log("get dm messages " , dmMessages)
    const {serverId} = useParams();

    const dispatch = useDispatch();
    const users = Object.values(useSelector(state => state.usersReducer))
    const current_user = useSelector(state => state.session.user)
    const [messageInput, setMessageInput] = useState('')
    const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];
    //const colorInd = users[ind] % COLORS.length;



    const handleMessageInput = (e) => {
        setMessageInput(e.target.value)
    }
    const listenForEnter = (e) => {
        if (e.key === "Enter") {
            handleMessageSubmit(e);
        }
    }

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        console.log("status of socket", socket.connected)
        console.log("before sending...", new Date())
        socket.send('message',
        {
            "sender_id": current_user.id,
            "is_channel_message": false,
            "dm_server_id": serverId,
            "body": messageInput
        })
        console.log("after sending...", new Date())
        // socket.on('message', (data)=>{
        //     console.log("after receiving 1...", new Date())
        //     console.log("received message from server", data)
        //     console.log("received broadcast msg, socket id:", socket.id)
        //     dispatch(create_dm(data))
        //     console.log("after receiving 2...", new Date())
        //     setMessageInput("")
        //     console.log("after receiving 3...", new Date())
        // })
    }

    const dateObj = {}
    for (let i=0; i< dmMessages.length;i++){
        let created_date = dmMessages[i].created_at.substring(0,10)
        if ( Object.keys(dateObj).includes(created_date)){
            dateObj[created_date].push(dmMessages[i])
        }
        else{
            let newArr = []
            dateObj[created_date] = newArr
            newArr.push(dmMessages[i])
        }
    }
    console.log("dataObj: ", dateObj)


    const messageContainer = Object.keys(dateObj).map((key, index) =>{
        return (
            <div key = {index} className='all-messages-container'>
                    <div className='date-divider'> {getMonthYear(key)}</div>
                    {  dateObj[key].sort((a,b) =>a.id-b.id).map((item, idx) =>{
                        const colorInd = item.user_id % COLORS.length;
                        return (
                            <div key = {idx} className="channel-message-container">
                                <img className={`channel-message-user-profile-image ${COLORS[colorInd]}-bg` } src={"https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-White-1024x780.png"} alt={"bb"}/>
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
        <div id='dm-main-chat' className='flx-row'>
            <div id='chat-nav' className='flx-row-align-ctr'>Channel name and (optional) topic goes here</div>

            <div id='dm-chat-window' className='flx-col'>
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

        </div>
    )

}

export default DmChatBox
