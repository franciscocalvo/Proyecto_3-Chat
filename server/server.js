var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'../public')));


/*Mensaje cuándo se produzca la conexión*/
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});