$(document).ready(function(){
    var socket = io();
    
    var mensaje = $("#mensaje");
    mensaje.keyup(function(e){
        socket.emit('mensaje',mensaje.val());
    });
    
    
    
    
});