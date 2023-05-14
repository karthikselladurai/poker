import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux'
import {setRoomLink,setIsGameAdmin} from '../redux/reducers/pokerReducer'
import randomstring from "randomstring";
import {  createRoom } from "../service/io";
import socket from '../service/socket'

const CreateRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  // const roomId = randomstring.generate(10);
  // console.log("roomId",roomId);

  const [username, setUsername] = useState("");

  const handleJoinRoom = () => {
    console.log("socket>>>>>>>>>>>>>",socket);

    //
    socket.emit("createRoom", { username });

    socket.on("roomCreated", (roomId) => {
      const roomLink = `http://localhost:3000/createRoom/game1/${roomId}`;
      console.log(`Room created: ${roomLink}`);
      dispatch(setRoomLink(roomLink));
      dispatch(setIsGameAdmin(true))

      // You can now display the room link to the user
    });
    navigate("game1", { replace: true });
  };

  useEffect(() => {
    // ioCon();
  }, []);

  //   const handleJoinRoom = () => {
  //     createRoom(roomId)
  //   };

  const handleMessageSend = () => {
    const data = { room, message };
    createRoom(data);
    setMessage("");
  };

  return (
    <div>
      <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleJoinRoom}>nick name</button>
      </div>

      {/* <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.username}</span>: {msg.message}
          </div>
        ))}
      </div>

      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleMessageSend}>Send Message</button> */}
    </div>
  );
};

export default CreateRoom;
