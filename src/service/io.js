import { io } from 'socket.io-client';
import {useDispatch} from 'react-redux'
import { setRoomLink } from '../redux/reducers/pokerReducer';
// import socket from './socket';


// export const ioCon = () => {
//   console.log("yess");
//       this.socket = io('http://localhost:8080');
// }
// export const getMsg = () => {
//     socket.on('message', (data) => {
//         console.log('Received message from server:', data);
//     });
// }
// export const sendMsg = (msg)=>{
//     socket.emit('message', msg);
// }
// export const newRequest = ()=>{
//   console.log(">>>>>>>>>>>>>>waiting for request");
//   socket.on("newRequest", (data) => {
//     console.log("dta>>>>>>", data);
//     // setRequestArray(prevArray => [...prevArray, data]);
    
//   });
// }
// export const createRoom = (username)=>{
//   // const dispatch = useDispatch()
//     // 
//     socket.emit('createRoom', { username });

//   socket.on('roomCreated', (roomId) => {
//     const roomLink = `http://localhost:3000/game1/${roomId}`;
//     console.log(`Room created: ${roomLink}`);
//     // dispatch(setRoomLink(roomLink))
//     // You can now display the room link to the user
//   });
// }
// export default socket;