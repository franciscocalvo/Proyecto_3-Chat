var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'../public')));


io.on('connection',function(socket){
    console.log("user connect");
    socket.emit('conectado',"user conect");
    
    socket.on('mensaje_click',function(data){
        io.emit('mensaje_click',data);
    });
    
    
    socket.on('enter',function(data){
        console.log("enter");
    });
    
    socket.on('nombre_usuario',function(data){
        io.emit('nombre_usuario',data); 
    });
});


/*Mensaje cuándo se produzca la conexión*/
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});