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
    
    socket.on('desconexion_maquetacion',function(data){
        $('#ListaUser').empty();
        for(var llave in data){
            if(llave != socket.id){
                console.log(data[llave][0]);
                $('#ListaUser').append($(`<div class="info_izq"><div class="muestra_user"><div id="imagen_lista" class="avatar" style="background-image: url(${data[llave][2]})"></div><p class="name">${data[llave][0]}</p><div class="estado">${data[llave][1]}</div></div></div>`));
            };
        };
    });
    
    socket.on('mensaje_click',function(nombre_usuario,data){
        if(data.length <= 0){
            $('.entorno_mensajes').append($(`<div class="mnsg_user mnsg_error">${nombre_usuario}: *Mensaje vacio*</div>`)); 
        }else{
            $('.entorno_mensajes').append($(`<div class="mnsg_user">${nombre_usuario}: ${data}</div>`)); 
        };
    });
    
    boton.click(function(){
        socket.emit('mensaje_click', $('#texto').val());
        $('#texto').val('');
    });
    
    /*limpieza de pantalla(solo la del usuario)*/
    boton_limpiar.click(function(){
        $('.entorno_mensajes').empty();
    });
    

    
    socket.on('nombre_usuario',function(data,icono){
        $('label.name_user').text(data);
        $('#icono_perfil').css("background",`url(${icono})`);

    });
    
    socket.on('maquetacion',function(data){
        $('#ListaUser').empty();
        for(var key in data){
            if(key != socket.id){
                $('#ListaUser').append($(`<div class="info_izq"><div class="muestra_user"><div id="imagen_lista" class="avatar" style="background-image: url(${data[key][2]})"></div><p class="name">${data[key][0]}</p><div class="estado">${data[key][1]}</div></div></div>`));
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
    $("#cambio_input_nombre, #cambio_input_estado").keyup(function(event){
        if (event.keyCode == 13){
            socket.emit('nombre_usuario', $('#cambio_input_nombre').val(),$('input[name=icono]:checked').val());
            
            socket.emit('nombre', $('#cambio_input_nombre').val(),$('#cambio_input_estado').val(),$('input[name=icono]:checked').val());
            $('#cambio_input_nombre').val('');
            $('#cambio_input_estado').val('');
            $('#radio-default').prop("checked", true);
            $('#myModal').modal('hide');
        }
    });
    

});