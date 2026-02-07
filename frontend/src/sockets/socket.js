import { io } from "socket.io-client";

export const connectSocket = (token) => {
  return io(process.env.REACT_APP_API_URL, {
    auth: { token }
  });
};
