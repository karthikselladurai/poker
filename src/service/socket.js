import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
});

export default socket;