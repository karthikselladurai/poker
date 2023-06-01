import "./singleBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import { setSeatArray, addPlayersReq, setIsRoomRequestAccepted, setRoomId, addPlayerList, setPlayerList, setCommunityCards } from '../../redux/reducers/pokerReducer'
import Player from "../player/player";
import Options from "./option/Options";
import socket from "../../service/socket";
import Card from "../card/Card";
import Home from "../home/Home";
import { generateDeckOfCards, popCards, shuffle } from '../../utils/cards'
import PlayerOption from "../playerOptions/PlayerOptions";

const SingleBoard = () => {
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
  // const [initiated, setInitiated] = useState(true);



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
  const communityCards = useSelector((state) => state.poker.communityCards)
  const gameInitiated =  useSelector((state) => state.poker.gameInitiated)


  let deck = generateDeckOfCards();
  // console.log("start community card ", communityCards);
  console.log(IsGameAdmin, "user id for this user ", userId, "roomId", roomId);


  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [sendSeatData,SetSendSeatDate] = useState()
  // console.log(isRoomRequestAccepted, "seat array ", seatArray);
  // console.log("playes list ", playerList);

  useEffect(() => {
    if (IsGameAdmin) {
      socket.on("new join request", (data) => {
        console.log("new join request>>>>>>>", data);
        dispatch(addPlayersReq(data))
        console.log("arrayyyyy", requestArray);
      });
      socket.on("room seat", (data) => {
        console.log("room seat receive message update seat array ", data);
        dispatch(setSeatArray(data));

      })

      setIsRoomLinkCreate(true)
    } else {
      console.log("user Is not Game Admin");
      socket.on("Request Accepted", (data) => {
        console.log("my user Request Accepted by admin ", data);
        // setSeatArray(data.seatArray) 
        dispatch(setIsRoomRequestAccepted(true))
        console.log("dispatch(setRoomId(data.roomId))", data.roomId);
        dispatch(setRoomId(data.roomId))
        console.log(" dispatch(setSeatArray(data.seatArray))", data.seatArray);
        dispatch(setSeatArray(data.seatArray));

      })

      socket.on("game/room", (data) => {
        console.log("Received information admin start the game  ", data);
        data.playerList.sort((a, b) => a.seatId - b.seatId);
        let updatedPlayerList = [...data.playerList];
        console.log("before --- array ", updatedPlayerList);
        console.log(" after --- Sorted array ", updatedPlayerList);
        const index = data.playerList.findIndex((item) => item.userId === userId);
        console.log("index ", index);
        // console.log("step ---- 1  ",updatedPlayerList.splice(index));
        // console.log("step 2 ---- ",updatedPlayerList.splice(0,index)); 
        if (index !== 0) {
          // updatedPlayerList = updatedPlayerList.splice(0, index)
          updatedPlayerList = [...updatedPlayerList.splice(index), ...updatedPlayerList]
        }
        console.log("List updated ------ ", updatedPlayerList);
        console.log();
        dispatch(setPlayerList(updatedPlayerList))
        dispatch(setCommunityCards(data.communityCard))
        setIsGameStarted(true)
      })
    }


  }, [IsGameAdmin])

  const seatSelectedHandler = (data) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
    setSeatId(data);
    setSeatSelected(true);
    setStartSeatSelected(true)
  };
  const linkHandler = () => {
    setIsRoomLinkCreate(false);
  };
  const setSelectedSeatHandler = (data) => {  
    let updatedSeatArray = [];
    // let updatedSeatArray = [...seatArray];
    seatArray.forEach(x => {
      updatedSeatArray.push(Object.assign({}, x))
    });
    updatedSeatArray.sort((a, b) => a.seatId - b.seatId);
    const index = updatedSeatArray.findIndex((item) => item.seatId === data.seatId);
    if (index !== -1) {
      // updatedSeatArray.splice(index); // Remove the element using splice
      // updatedSeatArray.push({ ...seatArray[index], username: userName, approved: true, userId: userId }); // Add the updated element at the end
      // seatArray[index] = { username: userName, approved: true, userId: userId }
      updatedSeatArray = [...updatedSeatArray.splice(index), ...updatedSeatArray.splice(0, index)]
      console.log("array            >>>>>> ",updatedSeatArray);
      console.log("testxxxxxxxxx ",updatedSeatArray[0].username);
      updatedSeatArray[0].username = userName;
      updatedSeatArray[0].approved = true;
      updatedSeatArray[0].userId = userId;
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


  const startGameHandler = () => {
    console.log("Admin start the game and emit to group ");
    // let deck =  generateDeckOfCards();

    deck = shuffle(deck)
    // console.log("seat array", seatArray);
    let playerList = seatArray.filter((seat) => seat.approved === true)
    console.log('final player list ', playerList);

    let newList = playerList.map((user) => {
      console.log("users", user);
      let card = popCards(deck, 2)
      deck = card.mutableDeckCopy
      console.log("card, ", card);
      const updatedUser = { ...user, cards: card.chosenCards };
      return { ...user, cards: card.chosenCards };

    })
    let card = popCards(deck, 3)
    console.log(">>>>>>>>>> new list", newList);
    dispatch(setCommunityCards(card.chosenCards))

    // console.log(`room id ${roomId}`, 'players List', newList,"pocket cards : ",card.chosenCards );
    socket.emit("game/start", { roomId: roomId, playerList: newList, communityCard: card.chosenCards })
    let updatedPlayerList = [...newList];
    updatedPlayerList.sort((a, b) => a.seatId - b.seatId);
    const index = updatedPlayerList.findIndex((item) => item.userId === userId);
    if (index !== -1) {
      updatedPlayerList = [...updatedPlayerList.splice(index), ...updatedPlayerList.splice(0, index)]
    }
    dispatch(setPlayerList(updatedPlayerList))
    setIsGameStarted(true)
    console.log("community cards", communityCards);
  }

  return (
    <div className="poker-table">
      {!gameInitiated &&
      <Home/>}
      {gameInitiated && game && !isGameStarted &&
        <div className="seatSelect">
          <div className="seatSelect-ctn">
            <div className="seat-btn-ctn">
              {isRoomRequestAccepted ? (seatArray.map((data, index) => {
                return (
                  <div  key={data.seatId} className={`seat-view seat-${index}`}>
                    <button
                      className="seat-btn"
                      disabled={isGameStarted}
                      onClick={() => seatSelectedHandler(data.seatId)}
                    >
                      <span>{" Select Seat No" + data.seatId}</span>
                      <span>{data.username}</span>
                    </button>
                  </div>
                );
              })) : (<span className="waiting">
                Waiting For Accept the room Request...
              </span>)}
              <div className="seat-select-ctn">
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
      {isGameStarted && (
        <>
          <div className="communityCards">
            {communityCards.map((card) => (
              <Card key={`${card.suit} ${card.cardFace}`} data={card} />
            ))}
          </div>
          <div className="players">
            {playerList.map((player, index) => (
              <Player key={player.userId} index={index} data={player} />
            ))}
          </div>
          <PlayerOption />
        </>
      )}
    </div>
  );
};

export default SingleBoard;
