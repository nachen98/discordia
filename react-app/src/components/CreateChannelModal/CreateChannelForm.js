import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addOneChannel } from "../../store/channel";
import "./CreateChannelForm.css"
import "../../index.css"
import { onErrorLoadDiscLogoHandler } from "../../utils/helper";
export const CreateChannelForm=({ setShowModal })=>{
    const {serverId} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [newChannelName, setNewChannelName] = useState('new-channel');
    const [channelNameLengthErr, setChannelNameLengthErr] = useState('channel-name-length-color')
    useEffect(()=> {
        if(newChannelName.length > 50) setChannelNameLengthErr('red-text')
        else setChannelNameLengthErr('channel-name-length-color')
    }, [newChannelName])

    const handleCreateChannel = async e => {
        e.preventDefault()

        let errors = false;
        if(!newChannelName.trim().length){
            errors = true
            alert(`Please enter a name for your new channel.`)
        }

        if(newChannelName.length > 50){
            errors = true;
            alert(`50 characters max. Your message was ${newChannelName.length} characters long.`)
        }

        if(errors) return;

        const newChannel ={
            name: newChannelName,
        }
        dispatch(addOneChannel(newChannel, serverId))
        .then(createdChannel => history.push(`/channels/${serverId}/${createdChannel.id}`))
        .then(()=>setShowModal(false))
    }

    return (
        <div id='create-channel-form-container' className='flx-col-align-ctr pos-rel' >
            <div id='create-channel-header' className='left-algn-text'>Create Channel</div>
            <form id='create-channel-form' onSubmit={handleCreateChannel}>
                <label className='create-channel-label'>
                    <span className='create-channel-label-text'>CHANNEL NAME</span>
                    {/* <i className="fa-solid fa-hashtag"></i> */}
                    <div id='channel-name-input' className=''>
                    <svg width="16" height="16" viewBox="0 0 24 24" className="inputPrefix-1HHwWv" aria-hidden="true" role="img"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                    <input
                        id='create-channel-name-input'
                        className='create-channel-input flx-grow-one'
                        placeholder='new-channel'
                        type='text'
                        value={newChannelName}
                        onChange={e=> setNewChannelName(e.target.value)}
                    />
                    </div>

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
                <img onError={onErrorLoadDiscLogoHandler} id='close-modal-x' src='https://i.imgur.com/ai6mpis.png' alt='close' />
            </button>
        </div>
    )
}
