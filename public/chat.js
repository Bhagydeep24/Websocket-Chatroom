//connect to socket server
var socket= io.connect('http://localhost:6000/')

//dom
var handle=document.getElementById('handle'),
message=document.getElementById('message'),
feedback=document.getElementById('feedback'),
send=document.getElementById('send'),
output=document.getElementById('output');

//add addEventListener
send.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  })
  message.value = "";
});
message.addEventListener('keypress',function(){
  //alert("geb");
  socket.emit('typing',handle.value);
});


//listen to events
socket.on('chat',function(data){
  feedback.innerHTML = '';
   output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
