
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import './UsersListSidebar.css'

const UsersListSidebar = () => {
    const { serverId } = useParams();
    const allUsers = useSelector(state => state.usersReducer);
    const allRegularServers = useSelector(state => state.regularServerReducer);
    const server = allRegularServers[serverId];

    // TEMPORARY... WILL HAVE TO CONDITIONALL RENDER IN THE ChatBox COMPONENT
    // NOT DOING NOW SINCE YIBO IS WORKING ON THAT COMPONENT
    // WILL HAVE TO RESIZE CHATBOX COMPONENT ACCORDINGLY
    const pathLocation = useLocation();
    if (pathLocation.pathname === '/channels/@me') return (<span>Nothing to see here. Move along</span>)

    if (!server) return (<span>Loading...</span>)
    const serverUserIds = server.users

    return (
        <div id='users-list-sidebar' className='flx-col-algn-ctr'>
            {serverUserIds.map((userId) => {
                return (
                    <div key={userId} className='user-card flx-row-align-ctr'>
                        {allUsers[userId].username}
                    </div>
                )
            })}
        </div>
    )
}

export default UsersListSidebar
