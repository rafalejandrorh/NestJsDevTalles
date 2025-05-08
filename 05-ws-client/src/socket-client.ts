import { Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/messages-ws');
    addListeners(socket);
    //console.log(socket);
}

const addListeners = (socket: Socket) => {

  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUl = document.querySelector('#clients-ul')!;

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected';
  });

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnect';
  });

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = '';
    clients.forEach(clientId => {
      clientsHtml += `
        <li>${clientId}</li>
      `;
    });

    clientsUl.innerHTML = clientsHtml;
  });

  socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
    console.log(payload);
  });

}