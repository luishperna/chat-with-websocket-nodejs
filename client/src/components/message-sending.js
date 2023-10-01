export default function createMessageSending(elementId, ws) {
    const element = document.getElementById(elementId);

    element.innerHTML =
        `
        <div class="send-message">
            <h2>Enviar mensagem</h2>
            <div class="message-form">
                <label>NOME: <input id="username" type="text" placeholder="Digite seu nome aqui."/></label>
                <label>MENSAGEM: <input id="user-message" type="text" placeholder="Digite a mensagem aqui."/></label>
                <button id="send-message-button" type="submit">ENVIAR</button>
            </div>
        </div>
        `
    ;

    const sendMessageButton = document.getElementById("send-message-button");
    sendMessageButton.addEventListener("click", () => {
        const name = document.getElementById("username").value;
        const message = document.getElementById("user-message").value;

        if (!name || !message) {
            alert("Necessário preencher os campos NOME e MENSAGEM!");
            return;
        }

        const messageObj  = {
            wsType: "chat",
            user: name,
            message: message
        };

        ws.send(JSON.stringify(messageObj));
    })
}