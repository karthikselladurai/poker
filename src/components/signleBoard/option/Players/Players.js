import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import socket from '../../../../service/socket';
import { setPlayersReq } from '../../../../redux/reducers/pokerReducer';

const Players = ({ seatArray }) => {



  const roomId = useSelector((state) => state.poker.roomId)
  const playerReqArray = useSelector((state) => state.poker.playersReq);
  console.log("PLAYER",playerReqArray);
  const dispatch = useDispatch();

  const reqAcceptedHandler = (data) => {
    const updatedData = { ...data, accepted: true, roomId: roomId };
    const updatedPlayerReqArray = playerReqArray.map((item) =>
      item.userId === data.userId ? { ...item, accepted: true } : item
    );
    socket.emit('join', { userData: updatedData, seatArray });
    console.log('new user joint req accepted send to server ');
    dispatch(setPlayersReq(updatedPlayerReqArray));
  };

  const reqRejectHandler = (userId) => {
    socket.emit("request rejected", { userId });

    const updatedPlayerReqArray = playerReqArray.map((item) =>
      item.userId === userId ? { ...item, approved: false } : item
    );

    dispatch(setPlayersReq(updatedPlayerReqArray));
  };

  return (
    <div>
      {playerReqArray?.map((req) => {
        return (
          <div key={req.userId}>
            <span>{req.userName}</span>
            <button onClick={() => reqAcceptedHandler(req)}>
              {req.accepted ? 'Accepted' : 'Accept'}
            </button>
            {!req.accepted && (
              <button onClick={() => reqRejectHandler(req)}>Reject</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Players;
