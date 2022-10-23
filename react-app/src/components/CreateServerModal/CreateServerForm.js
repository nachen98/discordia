import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addOneRegularServer } from "../../store/regularserver";

const imageExtensions = [
    'jpeg',
    'jpg',
    'png'
]

const CreateServerForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [newServerName, setNewServerName] = useState(`${user.username}'s server`);
    const [newServerIcon, setNewServerIcon] = useState('')
    const [serverNameLengthErr, setServerNameLengthErr] = useState('server-name-length-color')
    const [serverIconErrMsg, setServerIconErrMsg] = useState('');

    useEffect(() => {
        if (newServerName.length > 50) setServerNameLengthErr('red-text')
        else setServerNameLengthErr('server-name-length-color')
    }, [newServerName])

    const handleCreateServer = async e => {
        e.preventDefault();
        let alertMsg = ''
        let iconLinkErrMsg = ''

        let errors = false;
        if (!newServerName.trim().length) {
            alertMsg = alertMsg + 'Please enter a server name.'
            errors = true;
        }

        if (newServerName.length > 50) {
            alertMsg = alertMsg + `50 characters max. Your topic was ${newServerName.length} characters long.`
            errors = true;
        }

        if (newServerIcon) {
            const imgUrlParts = newServerIcon.split('.')
            const newServerImgExt = imgUrlParts[imgUrlParts.length - 1];

            if (!imageExtensions.includes(newServerImgExt.toLowerCase())) {
                iconLinkErrMsg = iconLinkErrMsg + 'Invalid image URL. (jpeg, jpg, png supported). '
                errors = true;
            }

            if (newServerIcon.length > 255) {
                iconLinkErrMsg = iconLinkErrMsg + 'Please enter an image URL shorter than 255 characters'
                errors = true;
            }
        }

        if (errors) {
            setServerIconErrMsg(iconLinkErrMsg);
            if (alertMsg) alert(alertMsg)
            return;
        }

        const newServer = {
            name: newServerName,
        }

        // Will need to put some validations for this image url
        if (newServerIcon.length > 0) {
            newServer['image_url'] = newServerIcon
        }

        dispatch(addOneRegularServer(newServer))
        .then(createdServer=> history.push(`/channels/${createdServer.id}/${createdServer.channels[0]}`))
        .then(() => setShowModal(false))

    }

    return (
        <div id='create-server-form-container' className='flx-col-align-ctr pos-rel'>
            <h1 id='create-server-header' className='ctr-algn-text'>Customize your server</h1>
            <h3 id='create-server-desc' className='ctr-algn-text'>Give your new server a personality with a name and an icon. You can always change it later.</h3>
            <form id='create-server-form' onSubmit={handleCreateServer}>
                <label className='create-server-label'>
                    <span className='create-server-label-text'>SERVER ICON</span>
                    <input
                        id='create-server-img-input'
                        className='create-server-input'
                        placeholder="Please enter an image url."
                        type='text'
                        value={newServerIcon}
                        onChange={e => setNewServerIcon(e.target.value)}
                    />
                    <span className={`server-icon-err-msg red-text`}>{serverIconErrMsg} &nbsp;</span>
                </label>
                <label className='create-server-label'>
                    <span className='create-server-label-text'>SERVER NAME</span><span id='create-server-req-star' className='red-text'>*</span>
                    <input
                        id='create-server-name-input'
                        className='create-server-input'
                        placeholder='This field is required. 50 chars max.'
                        type='text'
                        value={newServerName}
                        onChange={e => setNewServerName(e.target.value)}
                    />
                    <span className={`server-name-length ${serverNameLengthErr}`}>{newServerName.length}</span>
                </label>
            </form>

            <div id='create-server-bottom' className='flx-row'>
                <button id='create-server-btn' onClick={handleCreateServer}>
                    Create
                </button>
            </div>

            <button
            id='close-create-server-btn'
            className='pos-abs'
            onClick={() => setShowModal(false)}>
                <img id='close-modal-x' src='https://i.imgur.com/ai6mpis.png' alt='close' />
            </button>
        </div>
    )
}

export default CreateServerForm;
