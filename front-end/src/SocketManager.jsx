import io from "socket.io-client";
// Connect to the back-end server through sockets
const socket = io("http://localhost:3001");

export default socket;
