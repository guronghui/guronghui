function getTotalTop(elem){
  var sum=0;
  do{
    sum+=elem.offsetTop;
    elem=elem.offsetParent;
  }while(elem);
  return sum;
}
 
var f1TotalTop=getTotalTop($("#f1")[0]);
var $lift=$("#lift");
var $floor=$("div.floor");
//console.log($floor);
window.addEventListener("scroll",()=>{
 var scrollTop=document.body.scrollTop
	         ||document.documentElement.scrollTop;
// console.log(scrollTop);
 var scroll_h=scrollTop+innerHeight*0.5;
var showLift=scroll_h>f1TotalTop?"block":"none";
    $lift.css("display", showLift);
  if($lift.css("display")=="block"){
  $.each($floor, function(i,fn){
   var  start=getTotalTop(fn);        
   var  end=start+$("#f"+(i+1)).height(); 
	   if(scroll_h>start&&scroll_h<end){
        $("#lift ul li").css("background","#fff");
		$(`#lift ul li:nth-child(${i+2})`).css("background","#FF4200");			
	   }
   }); 
  };
})
//为电梯中的每个层绑定单击事件
 $.each($floor, function(i,fn){
  $lift.on("click",`ul li:nth-child(${i+2})`,function(){
            $("html,body").stop(true).animate({
          //非css标准属性，jquery中独有
          scrollTop:getTotalTop(fn)-innerHeight*0.5+100
        },500);
  });
 });
 //顶端和低端的跳转

  $lift.on("click","ul li:nth-child(1)",function(){
            $("html,body").stop(true).animate({
          //非css标准属性，jquery中独有
          scrollTop:0
        },1000);
  });
  $lift.on("click","ul li:last-child",function(){
            $("html,body").stop(true).animate({
          //非css标准属性，jquery中独有
          scrollTop:$("body").height()
        },1000);
  });
 