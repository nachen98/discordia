import { useSelector } from "react-redux"
import { NavLink, useLocation, useParams } from "react-router-dom";
import ServerBanner from "./ServerBanner";

const getOtherUserIdInDm = (sessionUserId, dmServer) => {
    const userIds = dmServer.name.split('-');
    const dmRecipient = userIds.filter(id => parseInt(id) !== parseInt(sessionUserId));

    return dmRecipient[0]
}

const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];

const DmSidebar = () => {
    const sessionUser = useSelector(state => state.session.user)
    const allDmServers = Object.values(useSelector(state => state.dmServerReducer))
    const users = useSelector(state => state.usersReducer)

    const url = useLocation();
    const urlParts = url.pathname.split('/')
    const activeDmServerId = urlParts[3];

    const dmRecipientsUserIds = allDmServers.map(dmServer => getOtherUserIdInDm(sessionUser.id, dmServer))

    return (
        <div id='channel-or-dm-sidebar' className='flx-col'>

            <ServerBanner isDm={true} serverName='Direct Messages' />

            {allDmServers.map((dmServer, ind) =>{
                const activeView = parseInt(activeDmServerId) === dmServer.id ? 'active-view' : ''
                const colorInd = dmRecipientsUserIds[ind] % COLORS.length;
                return (
                    <NavLink to={`/channels/@me/${dmServer.id}`} key={dmServer.id}>
                        <div className={`server-channel-card flx-row-align-ctr ${activeView}`}>

                            <div className={`dm-logo-container flx-row-justify-align-ctr ${COLORS[colorInd]}-bg`}>
                                <img className='dm-logos' src='https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-White-1024x780.png' />
                            </div>
                            {users[dmRecipientsUserIds[ind]].username}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default DmSidebar