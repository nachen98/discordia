import { useParams } from 'react-router-dom';
import './ChannelOrDmSidebar.css'
import ServerBanner from './ServerBanner';

const ChannelOrDmSidebar = () => {

    // Use is_dm property to determine how to render this component
    const { channelId, serverId } = useParams()

    const serverImg = 'https://staticc.sportskeeda.com/editor/2022/03/199c9-16468646951546-1920.jpg';
    const serverName = 'discordia-cgh'
    const is_dm = false;

    const channels = [
        'general',
        'welcome',
        'coding'
    ]

    return (
        <div id='channel-or-dm-sidebar' className='flx-col'>
            {!is_dm && <ServerBanner serverName={serverName} serverImg={serverImg}/>}

            {channels.map((channel, ind) =>{
                return (
                    <span key={ind} className='channel-names channel-text'>
                        # {channel}
                    </span>
                )
            })}
        </div>
    )
}

export default ChannelOrDmSidebar
