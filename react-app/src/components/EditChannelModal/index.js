import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditChannelForm from "./EditChannelForm";
import './EditChannelForm.css'

const EditChannelModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <span tooltip="Edit Channel">
        <i class="fa-solid fa-gear" onClick={() => setShowModal(true)}></i>
        </span>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditChannelForm setShowModal={setShowModal}/>
            </Modal>
        )}
    </>
    )
}

export default EditChannelModal;
