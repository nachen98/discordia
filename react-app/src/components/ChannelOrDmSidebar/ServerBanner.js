import { useEffect, useState } from "react";
import ServerSettings from "../ServerSettings";
import ServerSettingsModal from "../ServerSettingsModal";
import { Modal } from "../../context/Modal";

const ServerBanner = ({ isDm, serverImg, serverName }) => {
    const [showServerSettings, setShowServerSettings] = useState(false);
    const [showServerSettingsModal, setShowServerSettingsModal] = useState(false)

    const openSettings = () => {
        if (showServerSettings) return;
        setShowServerSettings(true)
    }

    // Adds event listener to document so that menu will
    // disappear if user clicks outside of the menu
    useEffect(() => {
        if (!showServerSettings) return;

        const closeSettings = () => setShowServerSettings(false);
        document.addEventListener('click', closeSettings);

        return () => document.removeEventListener('click', closeSettings)
    }, [showServerSettings]);

    // Specific class so that the server banner on the dm page
    // will not have a cursor pointer and disables hover effect
    const dmServerClass = isDm ? 'dm-server-banner' : '';

    if (!serverImg) {
        return (
            <div
            id='server-text-only-title'
            className={`white-text flx-row-space-btw server-title pos-rel ${dmServerClass} ${isDm ? '' : 'server-title-container'}`}
            onClick={openSettings}
            >
                <span id='server-name'>{serverName}</span>
                <img id='settings-dropdown-logo' src='https://i.imgur.com/FD5ylDu.png' alt='settings-dropdown' />

                {showServerSettings && !isDm && <ServerSettings setShowServerSettingsModal={setShowServerSettingsModal} />}

                {showServerSettingsModal && (
                    <Modal onClose={() => setShowServerSettingsModal(false)}>
                        <ServerSettingsModal setShowServerSettingsModal={setShowServerSettingsModal} />
                    </Modal>
                )}
            </div>
        )
    }

    return (
        <>
            <div
            id='server-banner-container'
            className='pos-rel'
            onClick={openSettings}
            >
                <img id='server-banner-img' src={serverImg} />

                <div className='pos-abs white-text server-name-offset flx-row-space-btw server-title-container'>
                    <span id='server-name'>{serverName}</span>
                    <img id='settings-dropdown-logo' src='https://i.imgur.com/FD5ylDu.png' alt='settings-dropdown' />
                </div>

                {showServerSettings && <ServerSettings setShowServerSettingsModal={setShowServerSettingsModal} />}
            </div>

            {showServerSettingsModal && (
                <Modal onClose={() => setShowServerSettingsModal(false)}>
                    <ServerSettingsModal setShowServerSettingsModal={setShowServerSettingsModal} />
                </Modal>
            )}
        </>
    )
}

export default ServerBanner
