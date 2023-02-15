import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { deleteChannel } from "../../store/channel";


const ConfirmDeleteChannelForm =  ({ channel, currentServer, setShowConfirmDeleteForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showErrorText, setShowErrorText] = useState('dis-none')
    const [channelNameInput, setChannelNameInput] = useState('');
    console.log('-----delete channel----', channel)
    console.log('-----delete channel, currentServer----', currentServer)



    const handleDeleteChannel = () => {
        
    
        if (channel.name !== channelNameInput) {
            setShowErrorText('')
            return;
        }
    
        console.log('-----delete channel id----', +channel.id)
        dispatch(deleteChannel(currentServer.id, +channel.id))
        .then(() => {
            if (currentServer.channels.length) history.push(`/channels/${currentServer.id}/${currentServer.channels[0]}`)
            else history.push(`/channels/${currentServer.id}`)
        }).then(()=>setShowConfirmDeleteForm(false))
    }


    return (
        <div id='delete-server-form-container' className='flx-col-justify-align-ctr pos-rel'>
            <h2 id='delete-server-header'>Delete '{channel.name}'</h2>

            <div id='confirmation-text' className='flx-row-align-ctr'><div>Are you sure you want to delete <span className='bold-900'>{channel.name}</span>? This action cannot be undone.</div></div>

            <form id='delete-server-form' className='flx-col' onSubmit={handleDeleteChannel}>
                <span className='small-text bold-575'>ENTER CHANNEL NAME</span>
                <input
                    id='confirm-server-name-to-delete'
                    value={channelNameInput}
                    onChange={(e)=> setChannelNameInput(e.target.value)}
                />
                <span className={`pink-error-text small-text ${showErrorText}`}>You didn't enter the channel name correctly</span>
            </form>

            <div id='delete-server-buttons-container' className='pos-abs flx-row-align-ctr'>
                <button
                id='cancel-delete-server-btn'
                onClick={()=> setShowConfirmDeleteForm(false)}
                >
                    Cancel
                </button>

                <button
                id='delete-server-btn'
                onClick={handleDeleteChannel}
                >
                    Delete Channel
                </button>
            </div>
        </div>
    )
}



export default ConfirmDeleteChannelForm