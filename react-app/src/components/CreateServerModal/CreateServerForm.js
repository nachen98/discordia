import { useState } from "react";
import { useSelector } from "react-redux";


const CreateServerForm = ({ setShowModal }) => {
    const user = useSelector(state => state.session.user);
    const [newServerName, setNewServerName] = useState(`${user.username}'s server`);
    const handleCreateServer = e => {
        e.preventDefault();
    }

    return (
        <div id='create-server-form-container' className='flx-col-align-ctr pos-rel'>
            <h1>Customize your server</h1>
            <form id='create-server-form' onSubmit={handleCreateServer}>
                <input
                    id='create-server-name-input'
                    type='text'
                    value={newServerName}
                    onChange={e => setNewServerName(e.target.value)}
                />
            </form>
        </div>
    )
}

export default CreateServerForm;
