import { useSelector } from "react-redux"
import { NavLink, useLocation, useParams } from "react-router-dom";
import SessionUserBar from "../SessionUserBar";
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

            <div id='dm-card-container' className='flx-col'>
                {allDmServers.map((dmServer, ind) =>{
                    const activeView = parseInt(activeDmServerId) === dmServer.id ? 'active-view' : ''
                    const colorInd = dmRecipientsUserIds[ind] % COLORS.length;
                    return (
                        <NavLink to={`/channels/@me/${dmServer.id}`} key={dmServer.id}>
                            <div className={`dm-channel-card flx-row-align-ctr ${activeView}`}>

                                <div className={`dm-logo-container flx-row-justify-align-ctr ${COLORS[colorInd]}-bg`}>
                                    <img className='dm-logos' src='/assets/discordia-mascot.png' alt='logo' />
                                </div>
                                {users[dmRecipientsUserIds[ind]].username}
                            </div>
                        </NavLink>
                    )
                })}
            </div>

            <SessionUserBar />
        </div>
    )
}

export default DmSidebar
