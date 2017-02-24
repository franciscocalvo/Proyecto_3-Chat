var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'../public')));

var coleccionUsuario = {};

io.on('connection',function(socket){
    
    
    socket.on('nombre',function(data){
        coleccionUsuario[socket.id] = [data,"estado"];
        socket.broadcast.emit('usuario',coleccionUsuario[socket.id][0]);
        
    })
    
    socket.on('mensaje_click',function(data){
        io.emit('mensaje_click',coleccionUsuario[socket.id][0],data);
    });
    
    
    socket.on('nombre_usuario',function(data){
        io.emit('nombre_usuario',data); 
    });
    
    socket.on('nombre',function(data){
        io.emit('nombre',data); 
    });
    
    socket.on('disconnect',function(){
        console.log("user disconnect");
        socket.broadcast.emit('desconexion',coleccionUsuario[socket.id]);
        delete coleccionUsuario[socket.id];
    });

});



/*Mensaje cuándo se produzca la conexión*/
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});