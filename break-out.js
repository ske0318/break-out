// window.onload=init;

var COLOR=["aqua", "red", "green", "blue", "brown", "yellow","pink" ,"orange","purple","gray","white"];
var canvas;
var context;
var b_arr=[]; //벽돌 배열
var score=0; //점수
var brick_size=96; //벽돌 가로
var easy=[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var normal=[0,1,1,0,0,0,0,1,1,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0];
var hard=[1,0,0,0,1,0,0,0,0,0,1,1,0,1,1,1,0,0,0,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1];
var brick_rest=0; //남은 벽돌 갯수
var step=easy; //난이도

var ballcolor; //공 색깔
var break_index; //공과 부딪힌 벽돌의 인덱스 번호
canvas=$('#myCanvas')[0];
context=canvas.getContext('2d');

var music="<embed id='bgm' src='maintheme.wav' autostart='true' loop='true' hidden='true'></embed>";
var music1="<embed id='bgm' src='theme1.wav' autostart='true' loop='true' hidden='true'></embed>";
var music12="<embed id='bgm' src='theme1x3.wav' autostart='true' loop='true' hidden='true'></embed>";
var music13="<embed id='bgm' src='theme1x5.wav' autostart='true' loop='true' hidden='true'></embed>";
var music2="<embed id='bgm' src='theme2.wav' autostart='true' loop='true' hidden='true'></embed>";
var music22="<embed id='bgm' src='theme2x3.wav' autostart='true' loop='true' hidden='true'></embed>";
var music23="<embed id='bgm' src='theme2x5.wav' autostart='true' loop='true' hidden='true'></embed>";
var music3="<embed id='bgm' src='theme3.mp3' autostart='true' loop='true' hidden='true'></embed>";
var music32="<embed id='bgm' src='theme3x3.wav' autostart='true' loop='true' hidden='true'></embed>";
var music33="<embed id='bgm' src='theme3x5.wav' autostart='true' loop='true' hidden='true'></embed>";
var bgm=1;
var onoff="on";

var x=0; 
var y=0;
var brick_row=10;
var brick_col=10;
for(var i=0;i<brick_row;i++){   
 for(var j=0;j<brick_col;j++){
      b_arr.push({posX:x, posY:y,color:COLOR[i]}); //벽돌 배열에 벽돌 객체 넣기(x좌표, y좌표, 색깔)
      x+=brick_size;
    }
    x=0;
    y+=25;
  }

  function init(step){  //초기화 함수
    brick_rest=0;
    context.clearRect(0,0,canvas.width,canvas.height);
    score=0;
    $("#score").remove();
    var divscore="<div id='score'>SCORE: </div>";
    $("header").append(divscore)
    $("#score").append(score);
    for(var i=0;i<brick_row;i++){   //난이도에  따른 각 벽돌 별 색깔 지정
      for(var j=0;j<brick_col;j++){
        if(step[brick_col*i+j]==0)
          b_arr[brick_col*i+j].color=COLOR[10];
        else{

         brick_rest++;
         b_arr[brick_col*i+j].color=COLOR[i]; 
       }
     }
     x=0;
     y+=25;
   }
   for(var i=0;i<brick_row;i++){
     for(var j=0;j<brick_col;j++){

       context.fillStyle= b_arr[brick_col*i+j].color;
       context.strokeStyle="white";
       context.fillRect( b_arr[brick_col*i+j].posX,b_arr[brick_col*i+j].posY,brick_size, 25);
       context.strokeRect(b_arr[brick_col*i+j].posX,b_arr[brick_col*i+j].posY,brick_size, 25);
     }
   }

   var bar_x=405;
   context.beginPath(); 
   context.fillStyle="black";
   context.fillRect(bar_x,480,150,20);

   context.arc(480,467, 12, 0, 2.0 * Math.PI, false); 
   context.fillStyle="black"; 
   context.fill();
   

 }   
 $("#myCanvas").click(move);  //게임 화면을 누르면 게임 시작
 function move(){
  var x=480;
  var y=467;
   var dx=5; //얼만큼 대각선으로 내려가는지
   var dy=5; //아래로 내려가기, 위로 올라가기
   var bar_x=405;
   var bar_range;
   var bottom_line=32;
   function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    var size_x=191;
    for(var i=0;i<brick_row;i++){
     for(var j=0;j<brick_col;j++){
      context.fillStyle= b_arr[brick_col*i+j].color;
      context.strokeStyle="white";
      context.fillRect( b_arr[brick_col*i+j].posX,b_arr[brick_col*i+j].posY,size_x,25);
      context.strokeRect(b_arr[brick_col*i+j].posX,b_arr[brick_col*i+j].posY,size_x,25);

    }
  }
  context.beginPath();
  context.fillStyle=ballcolor;
      context.arc(x,y,12,0,Math.PI*2,true); //x,y는 중심좌표
      context.closePath();
      context.fill();

      $('#myCanvas').mousemove(function(event){
       bar_x=event.offsetX-75;
       bar_range=bar_x+150;
     });
      context.fillStyle="black";
      context.fillRect(bar_x,480,150,20);
      if(brick_rest==0){ //해당 난이도 클리어하면 다음 난이도로 넘어감

        switch(step){
          case easy:
          $("#win").addClass("winlose");
          $("#win").show();
          $("#winpic").click(function(){
            $("#win").hide();
            if(onoff=="off"){
              $("#bgm").remove();
            }
            else{
              $("#bgm").remove();
              if(bgm=="1"){
                $("body").append(music12);
              }
              else if(bgm=="2"){
                $("body").append(music22);
              }
              else {
                $("body").append(music32);
              }
            }
            step=normal;
            init(step);
          });
          break;
          case normal:
          $("#win").addClass("winlose");
          $("#win").show();
          $("#winpic").click(function(){
            $("#win").hide();
            $("#preferences_content").hide();
            if(onoff=="off"){
              $("#bgm").remove();
            }
            else{
              $("#bgm").remove();
              if(bgm=="1"){
                $("body").append(music13);
              }
              else if(bgm=="2"){
                $("body").append(music23);
              }
              else {
                $("body").append(music33);
              }
            }
            step=hard;
            init(step);
          });
          break;
          case hard:
          $("#finalwin").addClass("winlose");
          $("#finalwin").show();
          $("#finalwinpic").click(function(){
            $("#finalwin").hide();
            $("#page-wrapper").css("display", "none");
            $("#background").css("display","block");
            if(onoff=="off"){
              $("#bgm").remove();
            }
            else{
             $("#bgm").remove();
             $("body").append(music);
           }
        });      
        }
        clearInterval(timer);
      }
       if(isCrush(x,y)){ //현재 공의 위치가 벽돌과 부딪혔는지 검사
        b_arr[break_index].color=COLOR[10];
        dy=-dy;
        brick_rest--;
        score+=5; //점수 올리기(1개 깨뜨림 -> 5점 추가)
        $("#score").remove();
        var divscore="<div id='score'>SCORE: </div>";
        $("header").append(divscore)
        $("#score").append(score);
      }
      if(bar_x-12<=x && x<=bar_x+150+12) //공이 bar 위에 있으면 공이 내려갈 수 있는 하한선 조정
       bottom_line=32; //32=20(바)+12(공의 반지름) 
      else //공이 바 위에 있지 않을 때 공이 내려갈 수 있는 하한선 조정
        bottom_line=12; //원래 12 해야 하는데 그래픽 상으로 예뿜!

      if(x<12||x>(canvas.width-12)) //왼쪽, 오른쪽 벽에 부딪히면 x방향 전환
       dx=-dx; 
      if(y<=12||y>(canvas.height-bottom_line)){ //맨 위, 바닥/bar에 부딪히면 y방향 전환
        dy=-dy;
          if(bar_x-12<=x && x<=bar_x+150+12) //공이 bar에 부딪힌 위치에 따라 튕기는 각도를 변환
           dx=angleBall(x,bar_x);
       }
       if(bar_x-12<=x && x<=bar_x+150+12){ //게임 오버인지 검사
        if(y>canvas.height-32+8){
         clearInterval(timer);
         $("#lose").addClass("winlose");
         $("#lose").show();
       }

     }
     else{
      if(y>canvas.height-12){
       clearInterval(timer);
       $("#lose").addClass("winlose");
       $("#lose").show();
     }
   }

   x+=dx;
   y+=dy;


 }
 var timer=setInterval(draw,20);
}

function angleBall(posX, bar_x){  //공이 튀기는 각도를 변환하는 함수
 var temp_x=posX-bar_x;
 var count=0;
 for(var i=0;i<150;i+=15){
  if(temp_x<0)
   break;
 if(temp_x>150){
   count=10;
 }
 count++;
 if(i<=temp_x&&temp_x<=i+15)
   break;

}
return -5+count;
}
function isCrush(posX,posY){  //공이 벽돌에 부딪혔는지 검사하는 함수

  for(var i=0;i<brick_row;i++){
   for(var j=0;j<brick_col;j++){
    if(b_arr[brick_col*i+j].color!=COLOR[10]){
       if( b_arr[brick_col*i+j].posX<=posX && posX <= b_arr[brick_col*i+j].posX+brick_size && b_arr[brick_col*i+j].posY<=posY-12 && posY-12 <= b_arr[brick_col*i+j].posY+25){ //25: 브릭 높이
        break_index=brick_col*i+j;

        return true;
      } 
      if(b_arr[brick_col*i+j].posX<=posX && posX <= b_arr[brick_col*i+j].posX+brick_size &&  b_arr[brick_col*i+j].posY<=posY+12&& posY+12 <= b_arr[brick_col*i+j].posY+25){
       break_index=brick_col*i+j;
       
       return true;
     }
   }

 }
}
return false;
}


$("#preferences").click(function(){
 $("#preferences_content").addClass("popup");
 $("#preferences_content").show();
});

$("#OK").click(function(){
 onoff=$('input[name="onoff"]:checked').val();
 bgm=$('input[name="music"]:checked').val();
 if(onoff=="off"){
   $("#bgm").remove();
 }
 else{
  $("#bgm").remove();
  if(step==easy){
    if(bgm=="1"){
      $("body").append(music1);
    }
    else if(bgm=="2"){
      $("body").append(music2);
    }
    else {
      $("body").append(music3);
    }
  }
  else if(step==normal){
    if(bgm=="1"){
      $("body").append(music12);
    }
    else if(bgm=="2"){
      $("body").append(music22);
    }
    else {
      $("body").append(music32);
    }
  }
  else{
    if(bgm=="1"){
      $("body").append(music13);
    }
    else if(bgm=="2"){
      $("body").append(music23);
    }
    else {
      $("body").append(music33);
    }
  }
}
$("#preferences_content").hide();
});

$("#pre").click(function(){
  $("#background").css("display","none");
  $("#team").css("display", "block");
  step=easy;
  init(step);
});

$("#semifinal").click(function(){
  $("#background").css("display","none");
  $("#team").css("display", "block");
  step=normal;
  init(step);
});

$("#final").click(function(){
  $("#background").css("display","none");
  $("#team").css("display", "block");
  step=hard;
  init(step);
});

$("#school").click(function(){
  $("#lose").hide();
  $("#win").hide();
  $("#preferences_content").hide();
  $("#page-wrapper").css("display", "none");
  $("#background").css("display","block");
  if(onoff=="off"){
    $("#bgm").remove();
  }
  else{
    $("#bgm").remove();
    $("body").append(music);
  }
});

$("#losepic").click(function(){
  $("#lose").hide();
  $("#preferences_content").hide();
  $("#page-wrapper").css("display", "none");
  $("#background").css("display","block");
  if(onoff=="off"){
    $("#bgm").remove();
  }
  else{
    $("#bgm").remove();
    $("body").append(music);
  }
});

$("#red").click(function(){
  $("#team").css("display","none");
  $("#page-wrapper").css("display", "block");
  if(onoff=="off"){
    $("#bgm").remove();
  }
  else{
    $("#bgm").remove();
    if(step==easy){
      if(bgm=="1"){
        $("body").append(music1);
      }
      else if(bgm=="2"){
        $("body").append(music2);
      }
      else {
        $("body").append(music3);
      }
    }
    else if(step==normal){
      if(bgm=="1"){
        $("body").append(music12);
      }
      else if(bgm=="2"){
        $("body").append(music22);
      }
      else {
        $("body").append(music32);
      }
    }
    else{
      if(bgm=="1"){
        $("body").append(music13);
      }
      else if(bgm=="2"){
        $("body").append(music23);
      }
      else {
        $("body").append(music33);
      }
    }
  } 
  ballcolor="red";
});
$("#blue").click(function(){
  $("#team").css("display","none");
  $("#page-wrapper").css("display", "block");
  if(onoff=="off"){
    $("#bgm").remove();
  }
  else{
    $("#bgm").remove();
    if(step==easy){
      if(bgm=="1"){
        $("body").append(music1);
      }
      else if(bgm=="2"){
        $("body").append(music2);
      }
      else {
        $("body").append(music3);
      }
    }
    else if(step==normal){
      if(bgm=="1"){
        $("body").append(music12);
      }
      else if(bgm=="2"){
        $("body").append(music22);
      }
      else {
        $("body").append(music32);
      }
    }
    else{
      if(bgm=="1"){
        $("body").append(music13);
      }
      else if(bgm=="2"){
        $("body").append(music23);
      }
      else {
        $("body").append(music33);
      }
    }
  } 
  ballcolor="blue";
});