/*Empizo a poner comentarios porque me estoy perdiendo en mi propio código*/
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'../public')));

var coleccionUsuario = {};

io.on('connection',function(socket){
    
    /*Cuando recibo el nombre del usuario del modal, lo agrego al diccionario de usuarios usando de clave la id del socket que está conectado en el momento*/
    
    socket.on('nombre',function(data, estado, imagen){
        coleccionUsuario[socket.id] = [data, estado, imagen];
        console.log(coleccionUsuario);
        
        /*Mando a todos (menos a mi), el nombre del socket actual para el mensaje que informa de la coenxion de un usuario*/
        socket.broadcast.emit('usuario',coleccionUsuario[socket.id][0]);
         io.emit('maquetacion',coleccionUsuario);
        
    })
    
    socket.on('mensaje_click',function(data){
        io.emit('mensaje_click',coleccionUsuario[socket.id][0],data);
    });
    
    /*Envio el nombre del usuario con un evento diferente(para evitar lios), y genero el icocno, el nombre y la informacion del usuario en el menu de usuarios*/
    socket.on('nombre_usuario',function(data, icono){
        socket.emit('nombre_usuario',data,icono);
    });
    
    
    /*Cuando recibo el evento disconnect*/
    socket.on('disconnect',function(){
        console.log("user disconnect");
        socket.broadcast.emit('desconexion',coleccionUsuario[socket.id]);
        delete coleccionUsuario[socket.id];
        socket.broadcast.emit('desconexion_maquetacion',coleccionUsuario);
    });

});



/*Mensaje cuándo se produzca la conexión*/
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});