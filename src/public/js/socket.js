const socket = io();
document.getElementById('message').addEventListener('keypress', function(event) {
	console.log('boo');
	// If the user presses the "Enter" key on the keyboard
	if (event.key === 'Enter') {
		sendMessage({ message: $('#message').val() });
		getMessages();
		document.getElementById('message').value = '';
	}
});
$(() => {
	$('#send').click(() => {
		sendMessage({ name: $('#name').val(), message: $('#message').val() });
	});
	getMessages();
});

socket.on('message', addMessages);
function addMessages(message) {
	$('#messages').append(`<h4> ${new User(message.author).tag} <small>(${new Date(message.createdAt).toDateString()})</small></h4> <p> ${message.text} </p>`);
}

setInterval(() => {
	const start = Date.now();
	socket.emit('ping', () => {
		const end = new Date();
		console.log(`${end.toTimeString().split(' ')[0]} [EVENT]: ping	-	${end - start}ms`);
	});
}, 10000);

function getMessages() {
	$.get('http://192.168.0.14:3000/api/messages', (data) => {
		console.log(data);
		data.forEach(addMessages);
	});
}
socket.on('uploadProgress', function(percent) {
	console.log(percent);
});
socket.on('connect_error', function(err) {
	$('#notification').text('Connection Lost');
});
socket.on('connect', function() {
	$('#notification').text('');
});

function sendMessage(message) {
	$.post('http://192.168.0.14:3000/api/messages', message);
}
