import { useState } from "react";
import { Modal } from "../../context/Modal";
import {CreateChannelForm} from "./CreateChannelForm";

import './CreateChannelForm.css'

const CreateChannelModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <span tooltip="Create Channel">
        <i class="fa-solid fa-plus" onClick={() => setShowModal(true)}></i>
        </span>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateChannelForm setShowModal={setShowModal}/>
            </Modal>
        )}
    </>
    )
}

export default CreateChannelModal;
