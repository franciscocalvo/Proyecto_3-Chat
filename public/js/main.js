$(document).ready(function(){
    $('#myModal').modal({backdrop: 'static', keyboard: false});
    var socket = io();
    var boton = $('.boton');
    var boton_limpiar = $('.boton_limpieza');
    
    socket.on('usuario',function(data){
        $('.entorno_mensajes').append($(`<div class="mnsg_user">Se ha conectado ${data}</div>`)); 
    });
    
    /*Cuando recibo la respuesta del evento disconnect, genero un div con el nombre del usuario que se ha desconectado*/
    
    socket.on('desconexion',function(data){
        $('.entorno_mensajes').append($(`<div class="desconectado">Se ha desconectado ${data[0]}</div>`));
    });
    
    socket.on('mensaje_click',function(nombre_usuario,data){
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
    

    
    socket.on('nombre_usuario',function(data){
        $('label.name_user').text(data);

    });
    
    socket.on('maquetacion',function(data){
        $('#ListaUser').empty();
        for(var key in data){
            if(key != socket.id){
                console.log(data[key][0]);
                $('#ListaUser').append($(`<div class="info_izq"><div class="muestra_user"><div id="imagen_lista" class="avatar" style="background-image: url(./img/avatar_1.png)"></div><p class="name">${data[key][0]}</p><p class="estado">Estoy</p></div></div>`));
            }
        }
    });
    
    $('#texto').keyup(function(event){
       if (event.keyCode == 13){
           socket.emit('mensaje_click', $('#texto').val());
           $('#texto').val(''); 
       } 
    });
    
     /*Aquí es donde se captura el nombre del usuario(Solo al pulsar Enter)*/   
    $('#cambio_input').keyup(function(event){
        if (event.keyCode == 13){
            socket.emit('nombre_usuario', $('#cambio_input').val());
            socket.emit('nombre', $('#cambio_input').val());
            $('#cambio_input').val('');
            $('#myModal').modal('hide');
        }
    });
    

});