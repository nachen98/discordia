import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"

import './ServerSettings.css'

const ServerSettingsModal = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    return (
        <div id='server-settings-modal'>
            hi
        </div>
    )
}


const ServerSettings =  ({ setShowServerSettingsModal }) => {

    return (
        <>
            <ul id='server-settings-dropdown'  className='pos-abs'>
                <div
                className='settings-dropdown-selection flx-row-space-btw'
                onClick={() => setShowServerSettingsModal(true)}>
                    <span>Server Settings</span>

                    <img className='server-settings-dropdown-icons' alt='settings-gear' src='https://i.imgur.com/uGvARJz.png' />
                </div>
            </ul>
        </>
    )
}

export default ServerSettings
