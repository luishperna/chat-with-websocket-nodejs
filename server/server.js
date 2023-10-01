const WebSocket = require("ws");
const moment = require("moment");

const server = new WebSocket.Server({ port: 3050 });

let temporarySavedMessages = [];

server.on("connection", (ws) => {
    console.log("Cliente conectado.");

    // Evento que é disparado quando o servidor recebe uma mensagem do cliente
    ws.on("message", (message) => {
        console.log(`Mensagem recebida: ${message}`);
        const messageReceived = JSON.parse(message)

        if (messageReceived.wsType === "chat") {
            const formattedDatetime = moment().format("DD/MM/YYYY - hh:mm");
            const datetime = { datetime: formattedDatetime };
            const newMessage = Object.assign(messageReceived, datetime);

            saveMessageTemporarily(newMessage);

            const messagesList = getAllMessagesSaveTemporarily();
            const mensagemResponse = { wsType: "chat-response", messagesList: messagesList }

            // Envia a mensagem para todos os clientes
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(mensagemResponse));
                }
            });
        }
    });

    // Evento que é disparado quando o cliente fecha a conexão
    ws.on("close", () => {
        console.log("Cliente desconectado.");
    });
});

function saveMessageTemporarily(messageObj) {
    temporarySavedMessages.push(messageObj);
}

function getAllMessagesSaveTemporarily() {
    return temporarySavedMessages.slice().reverse();
}