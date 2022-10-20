import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { create_dm } from '../store/messages'

let socket;

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [dmServer, setDmServer] = useState({})
  const [dmLoaded, setDmLoaded] = useState(false)
  const [chatBody, setChatBody] = useState("");
  const [messages, setMessages] = useState([])
  const { userId }  = useParams();


  const current_user = useSelector(state => state.session.user)
  const msg = Object.values(useSelector(state => state.messagesReducer))
  
  console.log("current user :", current_user)
  console.log("user component rendering  :")
  console.log("msg is   :", msg)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    
    (async () => {
      const response = await fetch(`/api/dmservermessages/${userId}`);
     
      const server = await response.json()
      console.log("dm server is ",server.result)
      setDmServer(server.result);
    })();
  }, [userId]);

  useEffect(() => {
    socket = io.connect("http://localhost:5000")
    socket.on('connect', function() {
      //socket.send("User connected!");
      console.log("get connected !!")
  });

    return (() => {
      console.log("socket disconnected")
      socket.disconnect();
    });
  }, []);



  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("sender_id", current_user.id)
    console.log("dm_server_id", dmServer.id)
    console.log("body", chatBody)
    // let createdAt = new Date()
    // let updatedAt = new Date()

    socket.send('message', { "sender_id": current_user.id, "channel_message": false, "dm_server_id": dmServer.id, 'body': chatBody });

      socket.on('hello', (data)=>{
      console.log("RECEIEd data from server ",data)
      let res = JSON.parse(data)
      console.log("res body", res.body);
      console.log("message list1: ",messages)
      dispatch(create_dm(res))

      
      // setMessages((prev)=>{
      //   console.log("messages arr: ",prev, res.body)
      //   prev.push(res.body)
      //   console.log("messages arr: 2 ",prev, res.body)
      //   return prev;
      
      // })
     
    })
    
    setChatBody("");
  };

  const onChangeMessage = (e) => {
    setChatBody(e.target.value);
  };



  if (!user) {
    return null;
  }

  if (!dmLoaded) {
    setDmLoaded(true);
  }

  return (
    <>
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
    <div>
    </div>
    <form onSubmit={sendMessage}>
      <h3>Direct message</h3>

      <div>
        {msg.map((message, index) => (
          <div key={index}>{message.body}</div>
        ))}
      </div>
      <div></div>
       <label> current user: {current_user.username}</label>
       <br></br>
       <label> To {user.username} :</label> 
       <input type="text" value={chatBody} onChange={onChangeMessage}></input>
       <br></br>
       <button>send</button>
    </form>
    </>
  );
}
export default User;

