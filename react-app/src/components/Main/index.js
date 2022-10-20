import { useEffect, useState } from 'react'
import ChannelOrDmSidebar from '../ChannelOrDmSidebar'
import ChatBox from '../ChatBox'
import ServerSidebar from '../ServerSidebar'
import './Main.css'
import {io} from 'socket.io-client'

const Main = () => {
    // get params with useParam and pass in those props
    // to below components to determine what to render

    const [socketConnected, setSocketConnected] = useState(false);
    let socket = io.connect("http://localhost:5000")
//     socket.on('connect', ()=>{
//       console.log("socket connected -- value", socket.connected)
//   });
//     console.log ("MAIN component rendering....")
//     console.log("socket init..", socket)


    useEffect(() => {
        if (!socket || !socket.connected)
            socket.on('connect', ()=>{
                console.log("socket connected -- value", socket.connected)
                setSocketConnected(true);
        });
    
        return () => {
            socket.on('disconnect', () => {
                setSocketConnected(false);
              });
        };
      }, []);

    return (
        <div id='main' className='flx-row'>
            <ServerSidebar />
            <ChannelOrDmSidebar />
            <ChatBox  socket={socket}/>
        </div>
    )
}

export default Main
