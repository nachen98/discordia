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
    socket.on('connect', ()=>{
      console.log("socket connected -- value", socket.connected)
  });
    console.log ("MAIN component rendering....")
    console.log("socket init..", socket)


    // useEffect(() => {
    //     console.log("socket connected -- value 1", )

    //     // create websocket/connect
    //     if (!socket || !socketConnected){
    //         socket = io();
    //         setSocketConnected(true);
    //         console.log("socket connected -- value 2", socket.connected)
    //     }
    //     return (() => {
    //         socket.disconnect()
    //         socketConnected(false);
    //     })
        
    // })

    // useEffect(() => {
    //     console.log("socket connected -- value 1",socket )
    //     // create websocket/connect
    //     //socket = io();
    //     socket = io.connect("http://localhost:5000")
    //     console.log("socket connected -- value 2", socket.connected)
    //     // when component unmounts, disconnect
    //     return (() => {
    //         socket.disconnect()
    //         console.log("socket connected -- value 3", socket.connected)
    //     })
    // }, [])


    return (
        <div id='main' className='flx-row'>
            <ServerSidebar />
            <ChannelOrDmSidebar />
            <ChatBox  socket={socket}/>
        </div>
    )
}

export default Main
