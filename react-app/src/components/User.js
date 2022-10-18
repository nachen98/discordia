import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

let socket;

function User() {
  const [user, setUser] = useState({});
  
  const [dmServer, setDmServer] = useState({})
  const [dmLoaded, setDmLoaded] = useState(false)
  const [chatBody, setChatBody] = useState("");
  const [messages, setMessages] = useState([])
  const { userId }  = useParams();

  const current_user = useSelector(state => state.session.user)
  
  console.log("current user :", current_user)

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
    socket = io.connect("http://127.0.0.1:5000")
    socket.on('connect', function() {
      socket.send("User connected!");
  });

    return (() => {
      console.log("socket disconnected")
      socket.disconnect();
    });
  }, []);



  const sendMessage = (e) => {
    e.preventDefault();
    console.log("sender_id", current_user.id)
    console.log("dm_server_id", dmServer.id)
    console.log("body", chatBody)
    // let createdAt = new Date()
    // let updatedAt = new Date()

    socket.send('message', { "sender_id": current_user.id, "dm_server_id": dmServer.id, 'body': chatBody });
    messages.push(chatBody)
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
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
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

