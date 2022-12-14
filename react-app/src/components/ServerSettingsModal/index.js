import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal"
import { deleteRegularServer, updateRegularServer } from "../../store/regularserver";
import { onErrorLoadDiscLogoHandler } from "../../utils/helper";
import ConfirmDeleteModalForm from "../ConfirmDeleteModalForm";

import './ServerSettingsModal.css'

const imageExtensions = [
    'jpeg',
    'jpg',
    'png'
]

const ServerSettingsModal = ({ setShowServerSettingsModal }) => {
    const allRegServers = useSelector(state => state.regularServerReducer)
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const { serverId, channelId } = useParams();
    const server = allRegServers[serverId]

    const hidden = 'dis-none'

    const [serverName, setServerName] = useState(server.name)
    const [serverLogo, setServerLogo] = useState(server.image_url)
    const [serverNameErrMsg, setServerNameErrMsg] = useState('');
    const [serverLogoErrMsg, setServerLogErrMsg] = useState('');
    const [showSaveChangesBtn, setShowSaveChangesBtn] = useState(hidden)
    const [showConfirmDeleteForm, setShowConfirmDeleteForm] = useState(false);

    const sessionUserOwnsServer = sessionUser.id === server.owner_id

    const dispatch = useDispatch();
    const history = useHistory();

    const listenForEsc = (keydown) => {
        if (keydown.key !== 'Escape') return;

        setShowServerSettingsModal(false);
    }

    useEffect(() => {
        if (showSaveChangesBtn === '') return;
        if (serverName === server.name && serverLogo === server.image_url) return;

        setShowSaveChangesBtn('');
    }, [serverName, serverLogo])

    useEffect(() => {
        document.addEventListener('keydown', listenForEsc)

        return () => document.removeEventListener('keydown', listenForEsc)
    }, [])

    useEffect(() => {
        if(sessionUserOwnsServer) return;

        const alertNonOwner = e => {
            if (!e.target.className.includes('edit-server-input-field')) return;

            alert('You do not have permission to edit this server.')
        }

        document.addEventListener('click', alertNonOwner);

        return () => document.removeEventListener('click', alertNonOwner)
    })

    const handleServerUpdate = e => {
        e.preventDefault();

        let errors = false;
        if (serverName.length === 0){
            setServerNameErrMsg(`This field is required.`)
            errors = true;
        }

        if (serverName.length > 50) {
            setServerNameErrMsg(`Server name is ${serverName.length} and can not exceed 50 characters`)
            errors = true;
        }

        if (serverName.trim().length === 0){
            setServerNameErrMsg(`This field can not be empty.`)
            errors = true;
        }

        if (serverLogo.length) {
            const serverLogoUrlParts = serverLogo.split('.');
            const logoExtension = serverLogoUrlParts[serverLogoUrlParts.length - 1]

            if (!imageExtensions.includes(logoExtension.toLowerCase())) {
                setServerLogErrMsg('Invalid image URL. (jpeg, jpg, png supported)')
                errors = true;
            }
        }

        if (errors) return;

        // validation stuff here
        const updatedServer = {};
        updatedServer['name'] = serverName.trim();
        updatedServer['image_url'] = serverLogo;

        dispatch(updateRegularServer(updatedServer, +serverId))
            .then(() => setShowServerSettingsModal(false))
            // .then(() => history.push(`/channels/@me/${serverId}/${channelId}`))
    }

    const confirmDelete = () => {
        setShowConfirmDeleteForm(true)
    }

    return (
        <div id='server-settings-modal' className='flx-row'>
            <div id='server-settings-nav' className='flx-col'>
                <div id='current-server'>{server.name}</div>
                <div id='overview-div'>Overview</div>

                {sessionUserOwnsServer &&
                <div id='delete-server-div'
                className='flx-row-space-btw'
                // onClick={handleDeleteServer}
                onClick={confirmDelete}
                >
                    <span>Delete Server</span>
                    <img onError={onErrorLoadDiscLogoHandler} id='delete-server-logo' src='https://i.imgur.com/fyemDb2.png' alt='delete' />
                </div>}
            </div>


            <div id='right-main-content' className='flx-row'>
                <div id='overview-content' className='flx-col'>
                    <span id='overview-header'>Server Overview</span>

                    <form id='edit-server-form' className='flx-col' onSubmit={handleServerUpdate}>
                            <span className='edit-server-input-header'>
                                Server Name <span className='red-text'>*</span>
                            </span>

                            <input
                                className='edit-server-input edit-server-input-field'
                                placeholder="required field"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                                disabled={!sessionUserOwnsServer}
                            />

                            <span className='edit-server-err'>{serverNameErrMsg}</span>

                            <span className='edit-server-input-header'>Server Logo</span>
                            <input
                                className='edit-server-input edit-server-input-field'
                                value={serverLogo}
                                onChange={(e) => setServerLogo(e.target.value)}
                                disabled={!sessionUserOwnsServer}
                            />

                            <span className='edit-server-err'>{serverLogoErrMsg}</span>

                            {sessionUserOwnsServer &&
                            <button
                            type='submit'
                            id='submit-server-edit'
                            className={`${showSaveChangesBtn}`}
                            >
                                Save Changes
                            </button>}
                    </form>

                </div>

                <button
                id='close-server-settings'
                className='flx-col'
                onClick={() => setShowServerSettingsModal(false)}
                >
                    <img onError={onErrorLoadDiscLogoHandler}
                    id='close-server-modal-logo'
                    src='https://i.imgur.com/lziPn1x.png'
                    alt='close' />
                    ESC
                </button>
            </div>

            {showConfirmDeleteForm && (
                <Modal onClose={() => setShowConfirmDeleteForm(false)}>
                    <ConfirmDeleteModalForm setShowConfirmDeleteForm={setShowConfirmDeleteForm} server={server} />
                </Modal>
            )}
        </div>
    )
}

export default ServerSettingsModal
