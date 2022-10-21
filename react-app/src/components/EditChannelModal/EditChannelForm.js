
import "./EditChannelForm.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateChannel, deleteChannel } from "../../store/channel";

const EditChannelForm = ({setShowModal}) => {
    const {channelId} = useParams();
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
        .then(updatedChannel => history.push(`/channels/${updatedChannel.serverId}/${updatedChannel.id}`))
        .then(()=>setShowModal(false))
    }

    return (
        <div id='update-channel-form-container' className='flx-col-align-ctr pos-rel'>
            <div id='update-channel-header' className='left-algn-text'>OVERVIEW</div>
            <form id='update-channel-form' onSubmit={handleEditChannel}>
                <label>
                    <div id='update-channel-label-text'>CHANNEL NAME</div>
                    <input
                        id='update-channel-name-input'
                        type='text'
                        value={newName}
                        onChange={e=>setNewName(e.target.value)}
                    />
                </label>

                <label>
                    <div id='update-channel-label-text'>CHANNEL TOPIC</div>
                    <input
                        id='update-channel-topic-input'
                        type='text'
                        value={newTopic}
                        onChange={e=>setNewTopic(e.target.value)}
                    />
                </label>

            </form>
            </div>


    )
}
export default EditChannelForm