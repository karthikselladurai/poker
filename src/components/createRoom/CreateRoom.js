import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setRoomLink, setIsGameAdmin, setUserName, setRoomId, setIsRoomRequestAccepted } from '../../redux/reducers/pokerReducer'
import randomstring from "randomstring";
import { createRoom } from "../../service/io";
import socket from '../../service/socket'

const CreateRoom = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userName = useSelector((state) => state.auth.userName);
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [roomUrl, SetRoomUrl] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const [name, setName] = useState("");
  useEffect(() => {
    if (isAuth) {
      setName(userName)
      socket.auth = { userId: userId, userName: userName }
      socket.connect()
    }
  }, [])
  const createRoomHandler = () => {
    socket.emit("createRoom", userId);
    socket.on("roomCreated", (roomId) => {
      const roomLink = `http://localhost:3000/createRoom/game1/${roomId}`;
      console.log(`>>>>>>>>>>>>>>>>>>> Room created: ${roomLink}`);
      dispatch(setRoomLink(roomLink));
      dispatch(setIsGameAdmin(true))
      dispatch(setRoomId(roomId))
      dispatch(setIsRoomRequestAccepted(true))
      socket.emit("join", {
        userData: {
          roomId: roomId,
          isAdmin: true
        },
        seatArray: []
      }
      )
      console.log("send admin room joint req");
    });

    navigate("game1", { replace: true });
  };
  const joinRoomHandler = () => {
    const url = new URL(roomUrl);
    const pathname = url.pathname; // "/createRoom/game1/qJEJcEYO5s"
    const parts = pathname.split("/"); // ["", "createRoom", "game1", "qJEJcEYO5s"]
    const roomId = parts[3]; // "qJEJcEYO5s"
    if (roomId) {
      // Join room with roomId
      socket.emit("join", {
        userData: {
          isAdmin: false,
          userId: userId,
          userName: userName,
          roomId: roomId
        },
        seatArray: []
      })
      console.log('send user room joint req');
      // console.log("user join the room ", data);
      navigate("game1", { replace: true });

    }
  }
  useEffect(() => {
    socket.on("error", (msg) => {
      setError(true)
      setErrorMessage(msg)
      console.log("error: ", msg);
    })
  })
  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createRoomHandler}>Create Room</button>
      </div>
      <div>
        <input
          type="text"
          value={roomUrl}
          placeholder="Enter Room Link"
          onChange={(e) => SetRoomUrl(e.target.value)}
        />
        <button onClick={joinRoomHandler}>Join Room</button>
      </div>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default CreateRoom;
