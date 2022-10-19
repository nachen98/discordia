import { useState } from "react";
import { useSelector } from "react-redux";


const CreateServerForm = ({ setShowModal }) => {
    const user = useSelector(state => state.session.user);
    const [newServerName, setNewServerName] = useState(`${user.username}'s server`);
    const [newServerIcon, setNewServerIcon] = useState('')

    const handleCreateServer = e => {
        e.preventDefault();

        const newServer = {
            name: newServerName,
            image_url: newServerIcon || null
        }

        
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
                        placeholder="Please enter an image url"
                        type='text'
                        value={newServerIcon}
                        onChange={e => setNewServerIcon(e.target.value)}
                    />
                </label>
                <label className='create-server-label'>
                    <span className='create-server-label-text'>SERVER NAME</span><span id='create-server-req-star' className='red-text'>*</span>
                    <input
                        id='create-server-name-input'
                        className='create-server-input'
                        type='text'
                        value={newServerName}
                        onChange={e => setNewServerName(e.target.value)}
                    />
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
