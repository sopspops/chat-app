const socket = io();
const chat = document.querySelector('.chat-form');
const Input = document.querySelector('.chat-input');
const chatDisplay = document.querySelector('.chat-display');
const username = prompt('What is your name?');

socket.emit('new user', username);

chat.addEventListener('submit', event => {
    event.preventDefault();
    if (Input.value) {
        socket.emit('new message', Input.value);
        Input.value = '';
    }
});

socket.on('send message', (data) => {
    const div = document.createElement('div');
    div.textContent = data.username + ': ' + data.message;
    div.classList.add('chat-box');
    chatDisplay.appendChild(div);
    scrollTo(0, document.body.scrollHeight);
});
