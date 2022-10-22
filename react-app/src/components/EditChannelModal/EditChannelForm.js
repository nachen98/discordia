
import "./EditChannelForm.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateChannel, deleteChannel } from "../../store/channel";

const EditChannelForm = ({ setShowModal, channelId }) => {
    const {serverId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory();
    const [newName, setNewName] = useState("")
    const [newTopic, setNewTopic] = useState("")

    

    const handleEditChannel = async e => {
        e.preventDefault()

        const newChannel = {
            name: newName,
            topic: newTopic,
        }

        dispatch(updateChannel(newChannel, channelId))
            .then(updatedChannel => history.push(`/channels/${updatedChannel.result.server_id}/${updatedChannel.result.id}`))
                
            .then(() => setShowModal(false))
    }

    const handleDeleteChannel = () => {

        dispatch(deleteChannel(serverId, channelId))
            .then(() => history.push(`/channels/${serverId}`))
    }
    return (
        <div id='update-channel-form-container' className='flx-col-align-ctr pos-rel'>
            <div id='update-channel-header' className='left-algn-text'>OVERVIEW</div>
            <form id='update-channel-form' onSubmit={handleEditChannel}>
                <label id="update-chanel-label">
                    <div id='update-channel-label-text'>CHANNEL NAME</div>
                    <input
                        id='update-channel-name-input'
                        type='text'
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                </label>

                <label>
                    <div id='update-channel-label-text'>CHANNEL TOPIC</div>
                    <input
                        id='update-channel-topic-input'
                        type='text'
                        value={newTopic}
                        onChange={e => setNewTopic(e.target.value)}
                    />
                </label>

            </form>
            <div className="flx-row-space-btw">
                <div id='delete-channel-button'>
                    <button id='delete-channel-btn' onClick={handleDeleteChannel}>
                        Delete Channel
                    </button>
                </div>
                <div id='update-channel-button' className='flx-row'>
                    <button id='update-channel-btn' onClick={handleEditChannel}>
                        Save Changes
                    </button>
                </div>
            </div>


            <button
                id='close-update-channel-btn'
                className='pos-abs'
                onClick={() => setShowModal(false)}>
                <img id='close-modal-x' src='https://i.imgur.com/ai6mpis.png' alt='close' />
            </button>
        </div>


    )
}
export default EditChannelForm