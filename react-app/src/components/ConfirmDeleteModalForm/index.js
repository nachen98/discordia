import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { deleteRegularServer } from "../../store/regularserver";

import './ConfirmDeleteModalForm.css';

const ConfirmDeleteModalForm = ({ server, setShowConfirmDeleteForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showErrorText, setShowErrorText] = useState('dis-none')
    const [serverNameInput, setServerNameInput] = useState('');

    const handleDeleteServer = () => {

        if (server.name !== serverNameInput) {
            setShowErrorText('')
            return;
        }

        dispatch(deleteRegularServer(+server.id))
            .then(() => history.push(`/channels/@me`))
    }

    return (
        <div id='delete-server-form-container' className='flx-col-justify-align-ctr pos-rel'>
            <h2 id='delete-server-header'>Delete '{server.name}'</h2>

            <div id='confirmation-text' className='flx-row-align-ctr'><div>Are you sure you want to delete <span className='bold-900'>{server.name}</span>? This action cannot be undone.</div></div>

            <form id='delete-server-form' className='flx-col' onSubmit={handleDeleteServer}>
                <span className='small-text bold-575'>ENTER SERVER NAME</span>
                <input
                    id='confirm-server-name-to-delete'
                    value={serverNameInput}
                    onChange={(e)=> setServerNameInput(e.target.value)}
                />
                <span className={`pink-error-text small-text ${showErrorText}`}>You didn't enter the server name correctly</span>
            </form>

            <div id='delete-server-buttons-container' className='pos-abs flx-row-align-ctr'>
                <button
                id='cancel-delete-server-btn'
                onClick={()=> setShowConfirmDeleteForm(false)}
                >
                    Cancel
                </button>

                <button
                id='delete-server-btn'
                onClick={handleDeleteServer}
                >
                    Delete Server
                </button>
            </div>
        </div>
    )
}


export default ConfirmDeleteModalForm;
