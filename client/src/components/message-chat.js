export default function createMessage(elementId, messagesList) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";

    messagesList.forEach(message => {
        element.innerHTML +=
            `
            <div class="chat-messages">
                <span class="user-icon">${message.user[0]}</span>
                <div>
                    <p class="messageinformation">${message.user} | ${message.datetime}</p>
                    <p>${message.message}</p>
                </div>
            </div>
            `
        ;
    });
}