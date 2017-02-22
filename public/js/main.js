$(document).ready(function(){
    var socket = io();
    var boton = $('.boton');
    var boton_limpiar = $('.boton_limpieza');
    var nombre_usuario ="Fran";
    var listanombres = [];


    
    socket.on('conectado',function(data){
        $('.entorno_mensajes').append($(`<div class="mnsg_user">Se ha conectado ${nombre_usuario}</div>`)); 
    });
    
    socket.on('mensaje_click',function(data){
        if(data.length <= 0){
            $('.entorno_mensajes').append($(`<div class="mnsg_user mnsg_error">${nombre_usuario}: *Mensaje vacio*</div>`)); 
        }else{
            $('.entorno_mensajes').append($(`<div class="mnsg_user">${nombre_usuario}: ${data}</div>`)); 
        }
    });
    
    boton.click(function(){
        socket.emit('mensaje_click', $('#texto').val());
        $('#texto').val('');
    });
    
    /*limpieza de pantalla(solo la del usuario)*/
    boton_limpiar.click(function(){
        $('.entorno_mensajes').empty();
    });
    
    
    socket.emit('nombre_usuario',nombre_usuario);
    
    socket.on('nombre_usuario',function(data){
        $('label.name_user').text(data);
        $('#ListaUser').append($(`<div class="info_izq"><div class="muestra_user"><div id="imagen_lista" class="avatar" style="background-image: url(./img/avatar_1.png)"></div><p class="name">${data}</p></div></div>`));
    });
    
    $('#texto').keyup(function(event){
       if (event.keyCode == 13){
           socket.emit('mensaje_click', $('#texto').val());
           $('#texto').val(''); 
       } 
    });

});