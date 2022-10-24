
import "./EditChannelForm.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateChannel, deleteChannel } from "../../store/channel";
import {channelReducer} from "../../store/channel";
import { onErrorLoadDiscLogoHandler } from "../../utils/helper";

const EditChannelForm = ({ setShowModal, channelId }) => {
    const allChannels=useSelector(state => state.channelReducer)
    const allServers = useSelector(state => state.regularServerReducer)
    const channel=allChannels[channelId]
    const {serverId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory();
    const [newName, setNewName] = useState(channel.name)
    const [newTopic, setNewTopic] = useState("")
    const [newNameErrMsg, setNewNameErrMsg] = useState('')
    const [newTopicErrMsg, setNewTopicErrMsg] = useState('')

    const currentServer = allServers[serverId]

    const handleEditChannel = async e => {
        e.preventDefault()
        // let alertMsg = '';

        let errors = false;
        if (newName.length === 0 || newName.trim().length === 0){
            setNewNameErrMsg('This field is required.')
            errors = true;
        }

        if (newName.length > 50) {
            setNewNameErrMsg(`50 characters max. Your channel name was ${newName.length} characters long.`)
            // alert(`50 characters max. Your channel name was ${newName.length} characters long.`)
            // alertMsg = alertMsg + `50 characters max. Your channel name was ${newName.length} characters long. \n`
            errors = true;
        }

        if (newTopic.length > 50) {
            setNewTopicErrMsg(`50 characters max. Your channel name was ${newTopic.length} characters long.`)
            // alert(`50 characters max. Your topic was ${newTopic.length} characters long.`)
            // alertMsg = alertMsg + `50 characters max. Your topic was ${newTopic.length} characters long.`
            errors = true;
        }

        if(errors) {
            // alert(alertMsg);
            return;
        }

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
            .then(() => console.log('current server after channel deletion', currentServer))
            .then(() => {
                if (currentServer.channels.length) history.push(`/channels/${serverId}/${currentServer.channels[0]}`)
                else history.push(`/channels/${serverId}`)
            })
    }
    return (
        <div id='update-channel-form-container' className='flx-col-align-ctr pos-rel'>
            <div id='update-channel-header' className='left-algn-text'>OVERVIEW</div>
            <form id='update-channel-form' onSubmit={handleEditChannel}>
                <label id="update-chanel-label">
                    <div id='update-channel-label-text'>CHANNEL NAME</div>
                    <input
                        // id='update-channel-name-input'
                        className="edit-channel-input"
                        type='text'
                        value={newName}
                        placeholder={channel.name}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <span className='edit-server-err'>{newNameErrMsg}</span>
                </label>

                <label>
                    <div id='update-channel-label-text'>CHANNEL TOPIC</div>
                    <input
                        // id='update-channel-topic-input'
                        className="edit-channel-input"
                        type='text'
                        value={newTopic}
                        placeholder="Let everyone know how to use this channel!"
                        onChange={e => setNewTopic(e.target.value)}
                    />
                    <span className='edit-server-err'>{newTopicErrMsg}</span>
                </label>

            </form>
            <div id='button-containers' className="flx-row-space-btw">
                <div id='delete-channel-button'>
                    <button id='delete-channel-btn' className="edit-delete-buttons" onClick={handleDeleteChannel}>
                        Delete Channel
                    </button>
                </div>
                <div id='update-channel-button' className='flx-row'>
                    <button id='update-channel-btn' className="edit-delete-buttons" onClick={handleEditChannel}>
                        Save Changes
                    </button>
                </div>
            </div>


            <button
                id='close-update-channel-btn'
                className='pos-abs'
                onClick={() => setShowModal(false)}>
                <img onError={onErrorLoadDiscLogoHandler} id='close-modal-x' src='https://i.imgur.com/ai6mpis.png' alt='close' />
            </button>
        </div>


    )
}
export default EditChannelForm
