import io from 'socket.io-client';

let socket;

export const initSocket = () => {
  socket = io('http://localhost:5050');
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
