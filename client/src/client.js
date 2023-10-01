import createMessageSending from "./components/message-sending.js";
import createMessage from "./components/message-chat.js";

const ws = new WebSocket("ws://localhost:3050");
const connectionStatus = document.getElementById("connection-status");

// Evento disparado quando a conexão é estabelecida
ws.addEventListener("open", () => {
    connectionStatus.style.color = "#00ff00";
    connectionStatus.textContent = "( Conectado )";
});

// Evento disparado quando o servidor envia uma mensagem
ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    
    if(data.wsType === "chat-response") {
        const messagesList = data.messagesList;
        createMessage("messages", messagesList);
    }
    
});

// Evento disparado quando a conexão é fechada
ws.addEventListener("close", () => {
    connectionStatus.style.color = "#ff0000"
    connectionStatus.textContent = "( Desconectado )"
});

createMessageSending("message-sending", ws);