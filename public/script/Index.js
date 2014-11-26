//   CHAT SERVER PROGRAM
//   WEB CLIENT JAVASCRIPT FILE

var socket;

function addUser() {
    socket.emit('addUser', prompt('Please enter a chat name.'));
}

function sendMessage() {
    var message = $('#data').val();
    socket.emit('sendChat', message);
    $('#data').val('');
    $('#data').focus();
}

function processMessage(username, data) {
	$('<b>' + username + ': </b>' + data + '<br/>').insertBefore($('#conversation'));
}

function updateUserList(userNames) {
    $('#users').empty();
    $.each(userNames, function (key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
}

function processEnterPress(e) {
    if (e.which === 13) {
        e.preventDefault();
        $(this).blur();
        $('#dataSend').focus().click();
    }
}

$(document).ready(function () {
    socket = io.connect('http://localhost:8080');
    //socket = io.connect(window.location.hostname);
    socket.on('connect', addUser);
    socket.on('updateChat', processMessage);
    socket.on('updateUsers', updateUserList);
    $('#dataSend').click(sendMessage);
    $('#data').keypress(processEnterPress);
});
