import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addOneChannel } from "../../store/channel";
import "./CreateChannelForm.css"
export const CreateChannelForm=({ setShowModal })=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const user= useSelector(state=> state.session.user)
    const [newChannelName, setNewChannelName] = useState('new-channel');
    const [channelNameLengthErr, setChannelNameLengthErr] = useState('channel-name-length-color')
    useEffect(()=> {
        if(newChannelName.length > 50) setChannelNameLengthErr('red-text')
        else setChannelNameLengthErr('channel-name-length-color')
    }, [newChannelName])

    const handleCreateChannel = async e => {
        e.preventDefault()

        let errors = false;
        if(!newChannelName.length){
            errors = true
        }

        if(newChannelName.length > 50){
            errors = true;
        }

        if(errors) return;

        const newChannel ={
            name: newChannelName,
        }
        dispatch(addOneChannel(newChannel))
        .then(createdChannel => history.push(`/channels/${createdChannel.serverId}/${createdChannel.id}`))
        .then(()=>setShowModal(false))
    }

    return (
        <div id='create-channel-form-container' className='flx-col-align-ctr pos-rel' >
            <div id='create-channel-header' className='left-algn-text'>Create Channel</div>
            <form id='create-channel-form' onSubmit={handleCreateChannel}>
                <label className='create-channel-label'>
                    <span className='create-channel-label-text'>CHANNEL NAME</span>
                    <i class="fa-solid fa-hashtag"></i>
                    <input
                        id='create-chanel-name-input'
                        className='create-channel-input'
                        placeholder='new-channel'
                        type='text'
                        value={newChannelName}
                        onChange={e=> setNewChannelName(e.target.value)}
                    />
                    <span className={`channel-name-length ${channelNameLengthErr}`}>{newChannelName.length}</span>
                </label>
            </form>
            
            <div id='create-channel-button' className='flx-row'>
                <button id='create-channel-btn' onClick={handleCreateChannel}>
                    Create Channel
                </button>
            </div>

            <button
            id='close-create-channel-btn'
            className='pos-abs'
            onClick={() => setShowModal(false)}>
                <img id='close-modal-x' src='https://i.imgur.com/ai6mpis.png' alt='close' />
            </button>
        </div>
    )
}