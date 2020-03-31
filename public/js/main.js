const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


const socket = io();
addRoomNameToDOM()

const  { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({room, users}) => {
    addRoomNameToDOM(room)
    addUsersToDOM(users)
})

socket.on('message', message => {
    outputMessage(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', event =>{
    event.preventDefault()

    const msg = event.target.elements.msg.value
    
    socket.emit('chatMessage', msg)


    event.target.elements.msg.value = ''
    event.target.elements.msg.focus() = ''

})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function addRoomNameToDOM(room){
    roomName.innerText = room
}

function addUsersToDOM(users){
    userList.innerHTML = `${users.map(user => {
        return `<li>${user.username}</li>`
    }).join('')}`
}