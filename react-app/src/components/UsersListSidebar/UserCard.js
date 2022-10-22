import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DmUserPopUp from "../DmUserPopUp/DmUserPopUp";

import './UsersListSidebar.css'

const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];

const UserCard = ({ socket, userId }) => {
    const allUsers = useSelector(state => state.usersReducer);
    const [showDmPopUp, setShowDmPopUp] = useState(false);

    const colorInd = userId % COLORS.length;

    const openPopUp = () => {
        if (showDmPopUp) return;
        setShowDmPopUp(true);
    }

    useEffect(() => {
        if (!showDmPopUp) return;

        const closeDmPopUp = () => setShowDmPopUp(false);
        document.addEventListener('click', closeDmPopUp);

        return () => document.removeEventListener('click', closeDmPopUp)
    }, [showDmPopUp])

    return (
        <div onClick={openPopUp} className={`user-card flx-row-align-ctr pos-rel ${showDmPopUp ? 'popup-active' : ''}`}>

            <div className={`dm-logo-container flx-row-justify-align-ctr ${COLORS[colorInd]}-bg`}
            >
                <img className='dm-logos' src='https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-White-1024x780.png' />
            </div>

            {allUsers[userId].username}

            {showDmPopUp && <DmUserPopUp socket={socket} userId={userId} />}
        </div>
    )
}

export default UserCard
