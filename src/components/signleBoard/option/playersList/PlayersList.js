import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import socket from '../../../../service/socket';
import { addPlayerList, setPlayerReq } from '../../../../redux/reducers/pokerReducer';

const PlayersList = () => {


  const roomId = useSelector((state) => state.poker.roomId)
  const playerReqArray = useSelector((state) => state.poker.playersReq);
  let seatArray = useSelector((state) => state.poker.seats);
  console.log(seatArray, "PLAYER", playerReqArray);
  const dispatch = useDispatch();

  const reqAcceptedHandler = (data) => {
    const updatedData = { ...data, approved: true, roomId: roomId };
    const updatedPlayerReqArray = playerReqArray.map((item) =>{
      // item.userId === data.userId ? { ...item, accepted: true } : item
      if( item.userId === data.userId){
          // dispatch(addPlayerList({ ...item,  accepted: true}))
          return { ...item, approved: true }
        }else{
          return item
        }
    }
      
    );
    socket.emit('join', { userData: updatedData, seatArray });
    console.log('new user joint req accepted send to server with user details & seat array  ', seatArray);
    dispatch(setPlayerReq(updatedPlayerReqArray));
  };

  const reqRejectHandler = (userId) => {
    socket.emit("request rejected", { userId });

      const updatedPlayerReqArray = playerReqArray.map((item) =>
        item.userId === userId ? { ...item, approved: false } : item
        // if( item.userId === userId){
        //   dispatch(addPlayerList({ ...item, approved: false}))
        //   return { ...item, approved: false }
        // }else{
        //   return item
        // }
      
      );

    dispatch(setPlayerReq(updatedPlayerReqArray));
  };

  return (
    <div>
      {playerReqArray?.map((req) => {
        return (
          <div key={req.userId}>
            <span>{req.userName}</span>
            {req.approved == null &&
              <span>
                <button onClick={() => reqAcceptedHandler(req)}>
                  {req.approved ? 'Accepted' : 'Accept'}
                </button>
                <button onClick={() => reqRejectHandler(req)}>Reject</button>
              </span>
            }
            {req.approved == true && (
              <button onClick={() => reqRejectHandler(req)}>Reject</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayersList;
