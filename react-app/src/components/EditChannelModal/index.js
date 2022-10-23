import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditChannelForm from "./EditChannelForm";
import './EditChannelForm.css'

const EditChannelModal = ({channelId}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        {/* <div className='channel-setting-container'> */}
        <span tooltip="Edit Channel">
        <i className="fa-solid fa-gear" onClick={() => setShowModal(true)}></i>
        </span>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditChannelForm channelId={channelId} setShowModal={setShowModal}/>
            </Modal>
        )}
        {/* </div> */}
    </>
    )
}

export default EditChannelModal;
