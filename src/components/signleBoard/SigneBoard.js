import "./singleBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Options from "./option/Options";
import socket from "../../service/socket";
import randomstring from "randomstring";
import { useParams, useNavigate } from "react-router-dom";
import { setSeatArray, setPlayersReq, setIsRoomRequestAccepted, setRoomId } from '../../redux/reducers/pokerReducer'

const SingleBoard = () => {
  const seats = [
    {
      seatId: 1,
      userId: null,
      username: '',
      approved: false
    },
    {
      seatId: 2,
      userId: null,
      username: '',
      approved: false
    },
    {
      seatId: 3,
      userId: null,
      username: '',
      approved: false
    },
    {
      seatId: 4,
      userId: null,
      username: '',
      approved: false
    },

  ]

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isRoomLinkCreated, setIsRoomLinkCreate] = useState(false);
  const [seatId, setSeatId] = useState(1);
  const [test, setTest] = useState('');
  const [seatSelected, setSeatSelected] = useState(false);
  const [seatArray, setSeatArray] = useState([]);
  const [sendSeatData, setSendSeatData] = useState(false);
  const [requestArray, setRequestArray] = useState([]);
  const [userRoomId, setUserRoomId] = useState(false);
  const [startSeatSelect, setStartSeatSelected] = useState(false)
  const state = useSelector((state) => state.poker);
  const [username, setUsername] = useState('');



  const isRoomRequestAccepted = useSelector((state) => state.poker.isRoomRequestAccepted);
  const IsGameAdmin = useSelector((state) => state.poker.IsGameAdmin);
  const roomId = useSelector((state) => state.poker.roomId)
  const roomLink = useSelector((state) => state.poker.roomLink)
  const userName = useSelector((state) => state.auth.userName)
  const userId = useSelector((state) => state.auth.userId)
  const option = useSelector((state) => state.nav.option)
  const game = useSelector((state) => state.nav.game)


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [sendSeatData,SetSendSeatDate] = useState()
  console.log(isRoomRequestAccepted, "seat array ", seatArray);

  useEffect(() => {
    if (IsGameAdmin) {
      setIsRoomLinkCreate(true)
      setSeatArray(seats)
    }
    socket.on("seatList", (data) => {
      console.log("new seat list", data);
      setSeatArray(data)
    })

  }, [IsGameAdmin])

  const seatSelectedHandler = (data) => {
    setSeatId(data);
    setSeatSelected(true);
    setStartSeatSelected(true)
  };
  const linkHandler = () => {
    setIsRoomLinkCreate(false);
  };
  const setSelectedSeatHandler = (data) => {
    let updatedSeatArray = [...seatArray];
    const index = updatedSeatArray.findIndex(item => item.seatId === data.seatId);
    seatArray[index] = { ...seatArray[index], username: userName, approved: true ,userId:userId};
    if (index !== -1) {
      updatedSeatArray = seatArray.splice(index)
      updatedSeatArray = updatedSeatArray.concat(seatArray);
      setSeatArray([...updatedSeatArray]);
    }
    setStartSeatSelected(false)
   
    setSendSeatData(true)
  }
  
  useEffect(() => {
    if (!IsGameAdmin) {
      socket.on("Request Accepted", (data) => {
        console.log("my user Request Accepted by admin ", data);
        setSeatArray(data.seatArray)
        dispatch(setIsRoomRequestAccepted(true))
        dispatch(setRoomId(data.roomId))

      })
    }

  })
  // useEffect(()=>{
  //   socket.on("room seat",(data)=>{
  //     console.log("room seat",data);
  //     setSeatArray(data)
  //   })
  // })

  // Emit Seat Array To Room When It Updates
  useEffect(() => {
    if (sendSeatData) {
      console.log('user select seat and that information emit to server');
      socket.emit("room message", {
        seatArray: seatArray,
        roomId: roomId,
        userId:userId
      })
      setSendSeatData(false)
    // }else{
      // console.log('admin select seat so iam not send seat details to grp ');
    }
  }, [seatArray])
 
  useEffect(() => {
    socket.on("room seat", (data) => {
      setSeatArray(data)
      console.log("room seat receive message update seat array ", data);
    })
    socket.on("new join request", (data) => {
      console.log("new join request>>>>>>>",data);
      setRequestArray(prevArray => [...prevArray, data]);
      console.log("arrayyyyy", requestArray);
    });
    socket.on("game room", (data) => {
      if (data.isGameStart) {
        setIsButtonDisabled(true)
      }
    })
  }, []);


  useEffect(() => {
    console.log("arrayyyyy 2", requestArray);
    dispatch(setPlayersReq(requestArray))
  }, [requestArray]);



  const startGameHandler = () => {
    setIsButtonDisabled(true)
    console.log(roomId);
    socket.emit("game start", { roomId: roomId })

  }
  const checkUser = ()=>{
    socket.emit()
  }
  return (
    <div className="poker-table">
      {game &&
        <div>
          {isRoomRequestAccepted ? (seatArray.map((data) => {
            return (
              <button
                className="seat"
                key={data.seatId}
                disabled={isButtonDisabled}
                onClick={() => seatSelectedHandler(data.seatId)}
              >
                <span>{"Id " + data.seatId}</span>
                <span>{data.username}</span>
                {/* {data.approved ? "Unavailable" : "Available"} */}
              </button>
            );
          })) : (<span>
            Waiting For Accept the room Request...
          </span>)}
          {/* <button onClick={send}>send</button> */}
          {isRoomLinkCreated && (
            <div>
              <input placeholder={roomId} defaultValue={`http://localhost:3000/createRoom/game1/${roomId}`}></input>
              <button onClick={linkHandler}>Okay</button>
            </div>
          )}
          {startSeatSelect &&
            <div>
              <input placeholder={seatId} value={seatId} onChange={(e) => setSeatId(e.target.value)}></input>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <button onClick={() => { setSelectedSeatHandler({ userName: username, seatId: seatId }) }}>Selected</button>
            </div>
          }
        </div>
      }
      {option &&
        <div>
          <Options seatArray={seatArray}></Options>
        </div>
      }
      {!isButtonDisabled && IsGameAdmin&& <div><button onClick={startGameHandler}>Start Game...</button></div>}
      <div><button onClick={checkUser}>check user</button></div>
    </div>

  );
};

export default SingleBoard;
