import "./singleBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import { setSeatArray, addPlayersReq, setIsRoomRequestAccepted, setRoomId, addPlayerList, setPlayerList } from '../../redux/reducers/pokerReducer'
import Player from "../player/player";
import Options from "./option/Options";
import socket from "../../service/socket";
import { generateDeckOfCards, popCards, shuffle } from '../../utils/cards'

const SingleBoard = () => {
  const seats = [
    {
      seatId: 1,
      userId: null,
      username: '',
      approved: null
    },
    {
      seatId: 2,
      userId: null,
      username: '',
      approved: null
    },
    {
      seatId: 3,
      userId: null,
      username: '',
      approved: null
    },
    {
      seatId: 4,
      userId: null,
      username: '',
      approved: null
    },

  ]

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isRoomLinkCreated, setIsRoomLinkCreate] = useState(false);
  const [seatId, setSeatId] = useState(1);
  const [seatSelected, setSeatSelected] = useState(false);
  const [sendSeatData, setSendSeatData] = useState(false);
  const [requestArray, setRequestArray] = useState([]);
  const [userRoomId, setUserRoomId] = useState(false);
  const [startSeatSelect, setStartSeatSelected] = useState(false)
  const state = useSelector((state) => state.poker);
  const [username, setUsername] = useState('');
  const [gameOn, setGameOn] = useState(false)



  const isRoomRequestAccepted = useSelector((state) => state.poker.isRoomRequestAccepted);
  const IsGameAdmin = useSelector((state) => state.poker.IsGameAdmin);
  const roomId = useSelector((state) => state.poker.roomId)
  const roomLink = useSelector((state) => state.poker.roomLink)
  const userName = useSelector((state) => state.auth.userName)
  const userId = useSelector((state) => state.auth.userId)
  const option = useSelector((state) => state.nav.option)
  const game = useSelector((state) => state.nav.game)
  const seatArray = useSelector((state) => state.poker.seats)
  const playerList = useSelector((state) => state.poker.playerList)


  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [sendSeatData,SetSendSeatDate] = useState()
  console.log(isRoomRequestAccepted, "seat array ", seatArray);
  console.log("playes list ", playerList);

  useEffect(() => {
    if (IsGameAdmin) {
      socket.on("new join request", (data) => {
        console.log("new join request>>>>>>>", data);
        dispatch(addPlayersReq(data))
        console.log("arrayyyyy", requestArray);
      });
      setIsRoomLinkCreate(true)
    } else {
      socket.on("Request Accepted", (data) => {
        console.log("my user Request Accepted by admin ", data);
        // setSeatArray(data.seatArray) 
        dispatch(setIsRoomRequestAccepted(true))
        console.log("dispatch(setRoomId(data.roomId))", data.roomId);
        dispatch(setRoomId(data.roomId))
        console.log(" dispatch(setSeatArray(data.seatArray))", data.seatArray);
        dispatch(setSeatArray(data.seatArray));

      })

      socket.on("room seat", (data) => {
        console.log("room seat receive message update seat array ", data);
        dispatch(setSeatArray(data));

      })

      socket.on("game/room", (data) => {

        console.log("Received information admin start the game  ", data.playerList);
        dispatch(setPlayerList(data.playerList))
        setIsGameStarted(true)
      })
    }


  }, [IsGameAdmin])

  const seatSelectedHandler = (data) => {
    console.log(data);
    setSeatId(data);
    setSeatSelected(true);
    setStartSeatSelected(true)
  };
  const linkHandler = () => {
    setIsRoomLinkCreate(false);
  };
  const setSelectedSeatHandler = (data) => {
    let updatedSeatArray = [...seatArray];
    const index = updatedSeatArray.findIndex((item) => item.seatId === data.seatId);
    if (index !== -1) {
      updatedSeatArray.splice(index, 1); // Remove the element using splice
      updatedSeatArray.push({ ...seatArray[index], username: userName, approved: true, userId: userId }); // Add the updated element at the end
      if (IsGameAdmin) {
        dispatch(addPlayerList({ seatId: data.seatId, username: userName, approved: true, userId: userId }))
      }
    }

    setStartSeatSelected(false);
    setSendSeatData(true);
    console.log("update seate array when i select", updatedSeatArray);
    dispatch(setSeatArray(updatedSeatArray));
  };


  // Emit Seat Array To Room When It Updates
  useEffect(() => {
    console.log("update seat array ", seatArray);
    if (sendSeatData) {
      console.log('user select seat and that information emit to server ', seatArray);
      socket.emit("room message", {
        seatArray: seatArray,
        roomId: roomId,
        userId: userId
      })
      setSendSeatData(false)
    }
  }, [seatArray])


  useEffect(() => {
    console.log("seat array changed", seatArray);
  }, [seatArray])


  const startGameHandler = async () => {
    console.log("Admin start the game and emit to group ");
    let deck = await generateDeckOfCards();

    deck = await shuffle(deck)
    console.log("seat array",seatArray );
    let playerList = await seatArray.filter((seat) => seat.approved === true)
    console.log('final player list ', playerList);

    let newList = await playerList.map((user) => {
      console.log("users", user);
      let card = popCards(deck, 2)
      console.log("card, ", card);
      const updatedUser = { ...user, cards: card.chosenCards};
      return updatedUser;

    })
    console.log(newList);

    console.log(`room id ${roomId}`, 'players List', newList);
    socket.emit("game/start", { roomId: roomId, playerList: newList })
    dispatch(setPlayerList(newList))
    setIsGameStarted(true)
  }


  const cardsHandler = () => {
    let deck = generateDeckOfCards();

    deck = shuffle(deck)
    let newList = seatArray.map((user) => {
      // console.log("users",user);
      let card = popCards(deck, 2)
      const updatedUser = { ...user, cards: card.chosenCards };

      user['cards'] = card
      console.log("users", user);

    })
    console.log(seatArray);

    // console.log("dec ",deck);

    // console.log("shuffile deck ",deck);
    // let card =  await popCards(deck,2)
    // console.log(card);
  }
  return (
    <div className="poker-table">
      {game && !isGameStarted &&
        <div className="seatSelect">
          <div className="seatSelect-ctn">
            <div className="seat-btn-ctn">
              <div >
                {isRoomRequestAccepted ? (seatArray.map((data) => {
                  return (
                    <button
                      className="seat"
                      key={data.seatId}
                      disabled={isGameStarted}
                      onClick={() => seatSelectedHandler(data.seatId)}
                    >
                      <span>{" Select Seat No" + data.seatId}</span>
                      <span>{data.username}</span>
                    </button>
                  );
                })) : (<span>
                  Waiting For Accept the room Request...
                </span>)}
              </div>
              <div>
                {startSeatSelect &&
                  <div className="seatSelected">
                    <input placeholder={seatId} value={seatId} onChange={(e) => setSeatId(e.target.value)}></input>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <button onClick={() => { setSelectedSeatHandler({ userName: username, seatId: seatId }) }}>Selected</button>
                  </div>
                }
              </div >
            </div>
            {isRoomLinkCreated && (
              <div className="room-link">
                <input placeholder={roomId} defaultValue={`http://localhost:3000/createRoom/game1/${roomId}`}></input>
                <button onClick={linkHandler}>Okay</button>
              </div>
            )}

            {!isGameStarted && IsGameAdmin && <div className="start-game"><button onClick={startGameHandler}>Start Game...</button></div>}
            {/* {IsGameAdmin&& <button onClick={cardsHandler}>cards</button>} */}
          </div>
        </div>
      }
      {isGameStarted &&
        playerList.map(player => {
          return <Player key={player.userId} data={player} />
        })
      }
    </div>
  );
};

export default SingleBoard;
