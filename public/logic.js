$(document).ready(function(){
    
    const scoreboard=document.querySelector(".scorebord");
      
const nam =prompt("Enter your username to start chat.");
socket.emit("new-user-joined", nam);


socket.on("user-joined",name=>{
    const msgElement = document.createElement("div");
        msgElement.innerText=name;
        msgElement.classList.add("user");
        scoreboard.append(msgElement);
});

socket.on("receive",data=>{
    const msgElement = document.createElement("div");
msgElement.innerText=data;
msgElement.classList.add("msg");
scoreboard.append(msgElement);

  });

    var box=6;

    var b,c,d,e,f,g;
    var ran1=Math.floor(Math.random() * 10);
    var ran2=Math.floor(Math.random() * 10);
    var ran3=Math.floor(Math.random() * 10);
    var ran4=Math.floor(Math.random() * 10);
    var ran5=Math.floor(Math.random() * 10);
    var ran6=Math.floor(Math.random() * 10);
    
    
    var score=0;

    var timeup=false;
    
    $("div").click(function(){
        var id=$(this).attr('id');
        b=$(id).html();
    });

$("#submit").click(function () {
    $.post("/",
       {
          scre: score
       },
       function (data, status) {
          console.log(data);
       });
 });

 $("#x").text(ran1);
    
 $("#y").text(ran2);
 
 $("#z").text(ran3);

 $("#a").text(ran4);
 $("#b").text(ran5);
 $("#c").text(ran6);

 var b=$("#x").text();
 console.log(b)

    var boxes=document.querySelectorAll(".num");
    console.log(boxes);
    var issame=false;
    var first;
    var second;

    boxes.forEach((box)=>box.addEventListener("click",fun));
     
    function fun(){
        if(!issame){
            issame=true;
            first=this;
            var dd=$("#"+first.id).text();
            console.log(dd);
        }else{
            second=this;
            console.log(second.id);
           issame=false;
            checkit();

        }
    }

    function checkit(){
        
        if($("#"+first.id).text()===$("#"+second.id).text()){
            console.log("same");
            if(!timeup){
            score++;
            $(".score").text(score);
            }
            $("#"+first.id).hide();
            $("#"+second.id).hide();
            //socket
        }
        else{
            console.log("not same");
        }
    }
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
    clearInterval(downloadTimer);
    socket.emit("send",score);
    document.getElementById("countdown").innerHTML = "Time is Up";
    timeup=true;

  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

});