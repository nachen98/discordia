import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal"

import './ServerSettingsModal.css'

const ServerSettingsModal = ({ setShowServerSettingsModal }) => {
    const allRegServers = useSelector(state => state.regularServerReducer)
    const [showModal, setShowModal] = useState(false);
    const { serverId } = useParams();
    const server = allRegServers[serverId]

    const [serverName, setServerName] = useState(server.name)
    const [serverLogo, setServerLogo] = useState(server.image_url)

    const handleServerUpdate = e => {
        e.preventDefault();
        alert('hi')
    }

    return (
        <div id='server-settings-modal' className='flx-row'>
            <div id='server-settings-nav' className='flx-col'>
                <div id='current-server'>{server.name}</div>
                <div id='overview-div'>Overview</div>
                <div id='delete-server-div' className='flx-row-space-btw'>
                    <span>Delete Server</span>
                    <img id='delete-server-logo' src='https://i.imgur.com/fyemDb2.png' alt='delete' />
                </div>
            </div>


            <div id='right-main-content' className='flx-row'>
                <div id='overview-content' className='flx-col'>
                    <span id='overview-header'>Server Overview</span>

                    <form id='edit-server-form' className='flx-col' onSubmit={handleServerUpdate}>
                            <span className='edit-server-input-header'>Server Name <span className='red-text'>*</span></span>
                            <input
                                className='edit-server-input'
                                placeholder="required field"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                            />

                            <span className='edit-server-input-header'>Server Logo</span>
                            <input
                                className='edit-server-input'
                                value={serverLogo}
                            />

                            <button type='submit' id='submit-server-edit'>Save Changes</button>
                    </form>

                </div>

                <button
                id='close-server-settings'
                className='flx-col'
                onClick={() => setShowServerSettingsModal(false)}
                >
                    <img
                    id='close-server-modal-logo'
                    src='https://i.imgur.com/lziPn1x.png'
                    alt='close' />
                    ESC
                </button>
            </div>
        </div>
    )
}

export default ServerSettingsModal
