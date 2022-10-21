
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import DmUserPopUp from '../DmUserPopUp/DmUserPopUp';
import UserCard from './UserCard';
import './UsersListSidebar.css'

const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];

const UsersListSidebar = ({ socket }) => {
    const { serverId } = useParams();
    const allUsers = useSelector(state => state.usersReducer);
    const allRegularServers = useSelector(state => state.regularServerReducer);
    const server = allRegularServers[serverId];

    const [showDmPopUp, setShowDmPopUp] = useState(false);

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

    // TEMPORARY... WILL HAVE TO CONDITIONALL RENDER IN THE ChatBox COMPONENT
    // NOT DOING NOW SINCE YIBO IS WORKING ON THAT COMPONENT
    // WILL HAVE TO RESIZE CHATBOX COMPONENT ACCORDINGLY
    const pathLocation = useLocation();
    if (pathLocation.pathname === '/channels/@me') return (<span>Nothing to see here. Move along</span>)

    if (!server) return (<span>Loading...</span>)
    const serverUserIds = server.users

    return (
        <div id='users-list-sidebar' className='flx-col-align-ctr'>
            {serverUserIds.map((userId) => <UserCard key={userId} socket={socket} userId={userId} />)}
        </div>
    )
}

export default UsersListSidebar
