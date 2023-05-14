import "./singleBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ioCon } from "../service/io";
import socket from "../service/socket";
import { sendMsg, createRoom } from "../service/io";
import randomstring from "randomstring";
import { useParams, useNavigate } from "react-router-dom";

const SingleBoard = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  // const [roomLink, setRoomLink] = useState(false);
  const [isRoomLinkCreated, setIsRoomLinkCreate] = useState(false);
  // const [IsGameAdmin,setIsGameAdmin] = useState(false)
  const [seatId, setSeatId] = useState(1);
  const [seatSelected, setSeatSelected] = useState(false);
  const [seatArray, setSeatArray] = useState([1, 2, 3, 4]);
  const [requestArray, setRequestArray] = useState([]);

  // useSelector((state)=>{
  //   setRoomLink (state.poker.roomLink)
  //   setIsGameAdmin(state.poker.IsGameAdmin)
  // })
  const { roomLink, IsGameAdmin } = useSelector((state) => state.poker);
  console.log("roomLink", roomLink);

  useEffect(() => {
    // const roomId =  useSelector((state)=>state.poker.roomLink)
    // console.log(roomId);
    if (roomLink) {
      setIsRoomLinkCreate(true);
      console.log("roomId >>>>>>>>>>", roomLink);
      socket.emit("joinWithLink",1,2)
      // setIsRoomLinkCreate(true)
    } else {
      setIsRoomLinkCreate(false);
      // ioCon();
      const index = seatArray.indexOf(seatId);
      if (index === -1) return seatArray;
      setSeatArray(seatArray.slice(index).concat(seatArray.slice(0, index)));
      // setSeatSelected(true)
      console.log(">>>>>>>>>>>>>>>>>>>", seatSelected);
      console.log("2nd dummy ", dummyData);
    }
  }, [seatSelected, roomLink]);
  const dummyData = {
    1: "k1",
    2: "k2",
    3: "k3",
  };
  useEffect(() => {
    socket.on("newRequest", (data) => {
      setRequestArray(prevArray => [...prevArray, data]);
      console.log("dta>>>>>>", data);
    });
  }, []);

  const seatSelectedHandler = (data) => {
    setSeatId(data);
    dummyData[data] = "kdm";
    console.log("dummy data ", dummyData);
    setSeatSelected(true);
    console.log("seatArray", seatArray);
  };
  const send = () => {
    sendMsg("hiii");
    // createRoom(roomId)
  };
  const linkHandler = () => {
    setIsRoomLinkCreate(false);
  };

  return (
    <div className="poker-table">
      {seatSelected
        ? seatArray.map((data) => {
            return (
              <div className="seat" key={data}>
                {dummyData[data]
                  ? dummyData[data] + "- " + data
                  : "dummy-" + data}
              </div>
            );
          })
        : seatArray.map((data) => {
            return (
              <button
                className="seat"
                key={data}
                onClick={() => seatSelectedHandler(data)}
              >
                {data}
              </button>
            );
          })}
      <h1>{requestArray}</h1>
      <button onClick={send}>send</button>
      {isRoomLinkCreated && (
        <div>
          <input placeholder={roomLink} defaultValue={roomLink}></input>
          <button onClick={linkHandler}>Okay</button>
        </div>
      )}
    </div>
  );
};

export default SingleBoard;
