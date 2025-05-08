import './style.css'
import { connectToServer } from './socket-client'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br>

    <span id="server-status" >Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input id="message-input" placeholder="message" />
      <button id="send-btn">Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

const inputJwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (inputJwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer(inputJwtToken.value.trim());
});