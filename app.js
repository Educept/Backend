// var app = require('http').createServer(handler)
const io = require('socket.io-client');

var socket = io('http://0.0.0.0:8000');

var array = [1,2,3]

socket.emit('questions', array);
