import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateServerForm from "./CreateServerForm";

import './CreateServerModal.css'

const CreateServerModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        {/* <button id='modal-login' onClick={() => setShowModal(true)}>Create Server</button> */}
        <span id='create-server' className="material-symbols-sharp" onClick={() => setShowModal(true)}>
            add
        </span>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateServerForm setShowModal={setShowModal}/>
            </Modal>
        )}
    </>
    )
}

export default CreateServerModal;
