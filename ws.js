const io = require('socket.io')();
const EventEmitter = require('events');
const eventBus = new EventEmitter();


//track users and sockets
let map_user_socket = {}

function init(server) {
    console.log("Starting WS server");
    io.attach(server);

    io.on('connection', function(socket){
        console.log('client connected ',socket.id);
       
        socket.on('disconnect', function(){
          console.log('client disconnected');
        });
    });
}


eventBus.on('picture.created', function(event){
    //send to all clients
    io.emit('picture.created', event);
});

eventBus.on('picture.updated', function(event){
    //send to all clients
    io.emit('picture.updated', event);
});

eventBus.on('picture.deleted', function(event){
  //send to all clients
  io.emit('picture.deleted', event);
});

eventBus.on('slideshow', function(event){
    //send to all clients
    io.emit('slideshow', event);
  });

module.exports.init = init;
module.exports.eventBus = eventBus;