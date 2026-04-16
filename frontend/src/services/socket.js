import { io } from "socket.io-client";

export const socket = io("https://codepad-b79q.onrender.com", {
  reconnection: true,
});
