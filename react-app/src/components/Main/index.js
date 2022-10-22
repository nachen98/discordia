import { useEffect, useState } from 'react'
import ChannelOrDmSidebar from '../ChannelOrDmSidebar'
import ChatBox from '../ChatBox'
import ServerSidebar from '../ServerSidebar'
import './Main.css'
import {io} from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { create_dm } from '../../store/messages'

const Main = () => {
    // get params with useParam and pass in those props
    // to below components to determine what to render
    const dispatch = useDispatch();

    const [socketConnected, setSocketConnected] = useState(false);

    let socket = io()
    socket.connect("http://localhost:5000")
    socket.on('connect', ()=>{
        console.log("socket connected -- value", socket.connected)
    });
    console.log ("MAIN component rendering....")
    console.log("socket init..", socket)

    socket.on('message', (data)=>{
        console.log('--------------------------------------------------------------SOCKET . ON MESSAGE HAS BEEN INVOKED OVER HERE--------------------------------------------------------------')
        console.log("after receiving 1...", new Date())
        console.log("received message from server", data)
        console.log("received broadcast msg, socket id:", socket.id)
        dispatch(create_dm(data))
        console.log("after receiving 2...", new Date())
        // setMessageInput("")
        console.log("after receiving 3...", new Date())
    })


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
