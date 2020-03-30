const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io();


socket.on('message', message => {
    outputMessage(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', event =>{
    event.preventDefault()

    const msg = event.target.elements.msg.value
    
    socket.emit('chatMessage', msg)
})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}