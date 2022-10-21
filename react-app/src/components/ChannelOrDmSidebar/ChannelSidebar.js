import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"
import ServerBanner from "./ServerBanner";

const ChannelSidebar = () => {
    let { serverId, channelId } = useParams();
    serverId = parseInt(serverId);

    const [hasLoaded, setHasLoaded] = useState(false);
    const allRegularServers = useSelector(state => state.regularServerReducer);
    const allChannels = useSelector(state => state.channelReducer);

    // Will we have to take into account of when the server isn't initally loaded?
    // Thinking no since we should be retrieving ALL servers that sessionUser is in

    const server = allRegularServers[serverId];

    if (!server && !hasLoaded) {
        setHasLoaded(true);
        return (<span>Loading...</span>)
    }

    if (!server) return (<span>Loading...</span>)

    console.log('server is :', server)
    const channels = server.channels.map(channelId => allChannels[channelId])

    return (
        <div id='channel-or-dm-sidebar' className='flx-col'>
            <ServerBanner isDm={false} serverName={server.name} serverImg={server.image_url}/>

            {channels.map((channel) =>{
                const activeView = parseInt(channelId) === channel.id ? 'active-view' : ''
                return (
                    <>
                     <div id='text-channels' className="flx-row-space-btw">
                        TEXT CHANNELS
                        <i class="fa-solid fa-plus" style="cursor:pointer;" title="Create Channel"></i>
                     </div>
                     <NavLink to={`/channels/${serverId}/${channel.id}`} key={channel.id}>
                        <div className={`server-channel-card flx-row-align-ctr ${activeView}`}>
                            # {channel.name}
                        </div>
                    </NavLink>
                    </>
                   
                )
            })}
        </div>
    )
}

export default ChannelSidebar
