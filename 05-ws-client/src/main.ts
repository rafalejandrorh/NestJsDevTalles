import './style.css'
import { connectToServer } from './socket-client'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <span id="server-status" >Offline</span>

    <ul id="clients-ul"></ul>
  </div>
`

connectToServer();
