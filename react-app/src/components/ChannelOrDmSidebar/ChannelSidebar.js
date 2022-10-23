import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"
import ServerBanner from "./ServerBanner";
import { Modal } from '../../context/Modal';
import { CreateChannelForm } from '../CreateChannelModal/CreateChannelForm.js'
import CreateChannelModal from "../CreateChannelModal";
import EditChannelModal from "../EditChannelModal"
import SessionUserBar from "../SessionUserBar";
const ChannelSidebar = () => {
    let { serverId, channelId } = useParams();
    serverId = parseInt(serverId);

    const [hasLoaded, setHasLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const allRegularServers = useSelector(state => state.regularServerReducer);
    const allChannels = useSelector(state => state.channelReducer);

    // Will we have to take into account of when the server isn't initally loaded?
    // Thinking no since we should be retrieving ALL servers that sessionUser is in

    const server = allRegularServers[serverId];

    if (!server && !hasLoaded) {
        setHasLoaded(true);
        return (<span>Loading... from ChannelSideBar</span>)
    }

    if (!server) return (<span>Loading... also from ChannelSideBar</span>)

    console.log('server is :', server)
    const channels = server.channels.map(channelId => allChannels[channelId])

    return (
        <div id='channel-or-dm-sidebar' className='flx-col'>
            <ServerBanner isDm={false} serverName={server.name} serverImg={server.image_url} />
            <div id='text-channels' className="flx-row-space-btw">
                TEXT CHANNELS
                <CreateChannelModal />
                {/* <span tooltip="Create Channel">
                        <i className="fa-solid fa-plus" onClick={() => setShowModal(true)}></i>
                        </span>
                        {showModal && (
                        <Modal><CreateChannelForm setShowModal={setShowModal}/></Modal>)} */}
            </div>

            <div id='channel-or-dm-card-container' className='flx-col'>
                {!!channels.length && channels.map((channel) => {
                    const activeView = parseInt(channelId) === channel.id ? 'active-view' : ''
                    return (
                        <>
                            <div className={`channelname-and-setting flx-row-space-btw ${activeView}`}>
                                <NavLink to={`/channels/${serverId}/${channel.id}`} key={channel.id} className='flx-grow-one'>
                                    <div className={`server-channel-card flx-row-align-ctr `}>
                                        # {channel.name}
                                    </div>
                                </NavLink>
                                <EditChannelModal channelId={channel.id}/>
                            </div>

                        </>

                    )
                })}
        </div>

            <SessionUserBar />
        </div>
    )
}

export default ChannelSidebar
