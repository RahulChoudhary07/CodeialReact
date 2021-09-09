//////////  server part (include in sever.js)


function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

 

module.exports.chatSocket = function(chatServer){
    let io = require('socket.io')(chatServer);

    io.sockets.on('connection', function(socket){
        // socket is send by user
        console.log("new connection established ",socket.id);
        // send ack automatically to user that connection established .socket.on('connect')

        socket.on("joinRoom",function(data){
            // console.log("joining req accepted", data);

            // create a chatroom of this name or join in this chatroom name
            socket.join(data.chatroom);

            io.in(data.chatroom).emit("userJoined", data);



        });

        socket.on("send_message",function(data){
            io.in(data.chatroom).emit("sendingMsdToRoom", data);
            
        });


        socket.on('isTyping',function(data){
            io.in(data.chatroom).emit("sendingTypingMsdToRoom", data);
        });

        socket.on("disconnect", function(){
            console.log("socket disconnected");
        });

        

    });

}


