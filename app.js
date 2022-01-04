const express=require("express");
const app=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const users={};


//set view engine
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());


app.get("/",function(req,res){
    res.render("index");
});

//databse
mongoose.connect('mongodb://localhost:27017/numberGame').then(()=>{
        console.log("db connected");
}); 

const schma=new mongoose.Schema({
    score:String
});

const Score= mongoose.model("Score",schma);

app.post("/",function(req,res){
    var s = req.body.scre;
var newScore= new Score({
    score:s
});
     newScore.save((err, doc) => {
        if (!err)
            console.log('success', 'User added successfully!');
        else
            console.log('Error during record insertion : ' + err);
    });
    
})

//socket
io.on('connection', (socket) => {
    socket.on("new-user-joined",name=>{
                 users[socket.id]=name;
                io.emit("user-joined",name+" joined the game");
             });

             socket.on("send",message=>{
                io.emit("receive",users[socket.id]+"'s Score : "+message);
            });
        console.log("socket");

});


// app.listen(3000);


server.listen(3000, () => {
    console.log('listening on *:3000');
  });