
import ChannelOrDmSidebar from '../ChannelOrDmSidebar'
import ChatBox from '../ChatBox'
import ServerSidebar from '../ServerSidebar'
import './Main.css'

const Main = () => {
    // get params with useParam and pass in those props
    // to below components to determine what to render

    return (
        <div id='main' className='flx-row'>
            <ServerSidebar />
            <ChannelOrDmSidebar />
            <ChatBox />
        </div>
    )
}

export default Main
