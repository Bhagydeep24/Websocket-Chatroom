var express= require('express');
var socket=require('socket.io');

var app=express();

//listen server at port 4000
var server=app.listen('6000',function(){
  console.log("Port running at port 6000.");
});

//static files
app.use(express.static('public'));

//setup socket
var io=socket(server);

//when any browser makes a connection with socket
io.on('connection',function(socket){
  console.log('New connection joined'+socket.id);
  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });
});
