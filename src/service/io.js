import { io } from 'socket.io-client';
let socket;

export const ioCon = () => {
     socket = io('http://localhost:4000');
}
export const getMsg = () => {
    socket.on('message', (data) => {
        console.log('Received message from server:', data);
    });
}
export const sendMsg = (msg)=>{
    socket.emit('message', 'Hello from client!');
}