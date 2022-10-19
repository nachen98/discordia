import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import './ChannelOrDmSidebar.css'
import ChannelSidebar from './ChannelSidebar';
import DmSidebar from './DmSidebar';
import ServerBanner from './ServerBanner';

const getOtherUserIdInDm = (sessionUserId, dmServer) => {
    const userIds = dmServer.name.split('-');
    const dmRecipient = userIds.filter(id => parseInt(id) !== parseInt(sessionUserId));

    return dmRecipient[0]
}

const ChannelOrDmSidebar = () => {

    // Use is_dm property to determine how to render this component
    const { channelId, serverId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const allRegularServers = useSelector(state => state.regularServerReducer)
    const allDmServers = useSelector(state => state.dmServerReducer)
    const allChannels = useSelector(state => state.channelReducer)
    const users = useSelector(state => state.usersReducer);
    const [serverName, setServername] = useState('');
    const pathLocation = useLocation();
    const serverIdInt = parseInt(serverId)


    useEffect(() => {
        if (Object.values(allRegularServers).length === 0) return;
        if (pathLocation.pathname === '/channels/@me') return;

        const server = allRegularServers[serverIdInt] ?
        allRegularServers[serverIdInt] : allDmServers[serverIdInt];
        setServername(server.name)
    }, [serverIdInt])

    console.log('serverId is :', serverId)
    if (!parseInt(serverId)) return <DmSidebar />
    else return <ChannelSidebar />

    //
    //
    //
    //
    //
    // DROP EVERYTHING BELOW... REFACTORED TO KEEP COMPREHENSIBLE
    //
    //
    //
    //
    //

    // IF pathLocation.pathname === '/channels/@me' change the way that it is rendered
    // Will have to pass in dmServers rather than channels


    if (Object.values(allRegularServers).length === 0) return <span>Loading...</span>

    const server = allRegularServers[serverIdInt] ?
                    allRegularServers[serverIdInt] : allDmServers[serverIdInt] ?
                    allDmServers[serverIdInt] : false

    // server === false indicates that it is likely at /channels/@me
    //      ... or it's an edge case.
    let channels;
    server ?
        channels = server.channels.map(channelId => allChannels[channelId]) :
        channels = Object.values(allDmServers).map((server) => users[getOtherUserIdInDm(sessionUser.id, server)])
    console.log('channels are ', channels)


    const serverImg = 'https://staticc.sportskeeda.com/editor/2022/03/199c9-16468646951546-1920.jpg';
    const is_dm = false;

    // TEMPORARY - TO BE ABLE TO LOAD '/channels/@me'

    if (!serverName) {
        if (pathLocation.pathname === '/channels/@me') {
            setServername('dm-server')
            return (<span>Loading...</span>)
        }

        setServername(server.name)
        return (<span>Loading...</span>)
    }

    return (
        <div id='channel-or-dm-sidebar' className='flx-col'>
            {!is_dm && <ServerBanner serverName={serverName} serverImg={serverImg}/>}

            {channels.map((channel) =>{
                return (
                    <NavLink to={`/channels/${serverId}/${channel.id}`} key={channel.id}>
                        <div className='server-channel-card flx-row-align-ctr'>
                            # {channel.name || channel.username}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default ChannelOrDmSidebar
