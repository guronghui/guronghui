
/*隐藏header中的输入框并引入头部*/

show_header("none");

/***************
//首页中的搜索功能
************/
var $searcha=$("#search span.input_box>a");
  $searcha.click(function(e){
      e.preventDefault();
      var val=$(this).siblings("input").val();
	  location.href="02_product_list.html?kw="+$.trim(val);
  });
/*
********************************************************
注册页面的背景 canvas画图作为背景
********************************************************/
(()=>{function rn(min,max){
        return Math.random()*(max-min)+min;
    }
    function rc(){
        var r=parseInt(rn(0,250));
        var g=parseInt(rn(0,250));
        var b=parseInt(rn(0,250));
        return `rgb(${r},${g},${b})`;
    }
    var c2=document.getElementById("c2");
    var ctx = c2.getContext("2d");
  
   var rx=rn(0,400),ry=rn(0,320);
    var col=rc();     
  for(var i=0;i<50;i++){   		
     ctx.beginPath();	 
     ctx.arc(rx,ry,rn(0,5),0,2*Math.PI);  
     ctx.strokeStyle=col;
     ctx.fillStyle=col;  
     ctx.globalAlpha=0.5;    
     ctx.fill();
     ctx.stroke();
	 if(i<50-1){
	 ctx.beginPath();
	 ctx.moveTo(rx,ry);
    rx=rn(0,400),ry=rn(0,320);
     ctx.lineTo(rx,ry);
	 ctx.stroke();
	  col=rc();
	 }
   }
   document.getElementById("quckly_register")
   .style.background="#fff url('"+c2.toDataURL()+"') no-repeat";
})();

//注册操作
   var uname="";
 $("#quckly_register p.uname_box input").change(function(){
    uname=$(this).val();
	 var html="";
	var prompt= $(this).parent().find("span.prompt");
	 prompt.html(html);
	prompt.css("color","#E4393c");
   //console.log(prompt);
	//console.log(uname);
	 if(uname.length>=3){        
	$.ajax({
    url: 'data/user/check_uname.php',
    data: {uname:uname},
    success: function(result){
		//console.log(result);
	 var code=result.code;		  
	
	 if(code==500){
      html='请联系管理员';	
	 }else 	 if(code==200){
	    html='OK';
	 prompt.css("color","#3CB46D")
	 }else	 if(code==201){
	    html='已占用';	
	 }
	  prompt.html(html);
	 }
	});
    }	
 });
  var upwd1='';
 $("#quckly_register p.upwd1_box input").change(function(){
     upwd1=$(this).val();
	 var html="";
	 var prompt= $(this).parent().find("span.prompt");
       prompt.html(html);
    prompt.css("color","#E4393c")
    if(upwd1.length>=6){
      html="OK";
	  prompt.css("color","#3CB46D")
   }else{
    html="至少6位";  
   }
   prompt.html(html);
 })
 var upwd2="";
$("#quckly_register p.upwd2_box input").change(function(){
    upwd2=$(this).val();
    var html="";
    var prompt= $(this).parent().find("span.prompt");
	   prompt.html(html);
    prompt.css("color","#E4393c");
	 if(upwd2.length>=6){
   if(upwd2==upwd1){
       html="OK";
	  prompt.css("color","#3CB46D");
  }else{
	  html="密码不一致";	 
	}
     prompt.html(html);
	 }
})
var phone="";
$("#quckly_register p.phone_box input").change(function(){
   phone=$(this).val();
    var html="";
    var prompt= $(this).parent().find("span.prompt");	 
    prompt.css("color","#E4393c");
	if(phone.length==11){
   if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)){
     html='OK';
	  prompt.css("color","#3CB46D");
    }else{
    html='格式不正确';
    }   
	}else if(phone.length>3){
	 html='长度不正确';
	}
	prompt.html(html);
})
 $("#quckly_register p.btn>button.clear").click(function(){
    var prompt= $(this).parents("form").find("span.prompt");	   
	     prompt.each(function(){
   			 $(this).html("");	   
	         }); 
 });
$("#quckly_register p.btn>button.register").click(function(e){
   e.preventDefault();
   var prompt= $(this).parents("form").find("span.prompt");
     //console.log(prompt);
      prompt.each(function(i){
      if($(this).html()!="OK"){
		 // console.log($(this).html());
	    $(this).parent().find("input").focus();
	   return false;	  
	  } 
       if(i==prompt.length-1){
		   if(upwd1==upwd2){
	     $.ajax({
           url: 'data/user/register.php',
           data: {uname:uname,upwd:upwd2,phone:phone,},
          success: function(data){
		      // console.log(data);
			   var html="";
			   var register_success=$("div.register_success");
			 if(data.code==200){               
			  $("#quckly_register p.btn>button.clear").click();			
			 register_success.css("display","block");    
				html=`
					     <p>
						<span class="msg">注册成功</span>
						<br>
						<button  class="thenLogin">立即登录</button>
						<button  class="thenBack">返回 </button>
						<br>
						<span class="thenClose">5s后关闭</span>
						</p>
						`;
               register_success.html(html);
			  var spanclose=$("div.register_success span.thenClose");
              var n=5;
			  var timer=setInterval(function(){
			        n--;
					if(n<=0){clearInterval(timer);
					   spanclose.html("5s后关闭");
                      register_success.css("display","none");
					   }else{
			           spanclose.html(`${n}s后关闭`);
					  }
			        },1000);
				  $("div.register_success button.thenLogin").click(function(){
			     $("#list a.go_login").click();
                  register_success.css("display","none");
			  });
			   $("div.register_success button.thenBack").click(function(){			    
                  register_success.css("display","none");
			  });
			 }else{
			  html=`
					   <p>
						<span class="msg">注册失败</span>
						<br>
						<button  class="thenLogin">重新注册</button>
						<button  class="thenBack">返回 </button>
						<br>
						<span class="thenClose">5s后关闭</span>
						</p>  
			  `;
              register_success.html(html);
              var n=5;	
			  var spanclose=$("div.register_success span.thenClose");
			  var timer=setInterval(function(){
				    
			        n--;
					if(n<=0){clearInterval(timer);
					   spanclose.html("5s后关闭");
                      register_success.css("display","none");
					   }else{
			           spanclose.html(`${n}s后关闭`);
					  }
			        },1000);
				 $("div.register_success button.thenLogin").click(function(){			   
                  register_success.css("display","none");
			  });
			   $("div.register_success button.thenBack").click(function(){			    
                  register_success.css("display","none");
			  });
			 }                    
		   }
		   });
		   }else{
		   $("#quckly_register p.upwd2_box input").focus();
           $("#quckly_register p.upwd2_box .prompt").html('密码不一致')
			   .css("color","#E4393c");
		   }
	   }
     });
	
})

/**************
*1楼的滚动效果
**************
*/
var timer1="";
var $as=$("#f1>div>div>a");
$("#f1>div>div").width(($as.length+1)*180);
function Timer1(){
 timer1=setInterval(function(){
       move_element();
},50);
}
Timer1();

function move_element(m=-1){
	    var n=1;     	  
	for(var i=1;i<$as.length+1;i++){
	 if($("#f1>div>div>a:nth-child("+i+")").css("float")=="left"){
       n=i; 
	   //console.log(n);
	   break;
    	  
	 }else if(i==$as.length){
		 n=1;
	  $as.css("float","left");
	// console.log(n);	 
	 }
	}
	 var $a1=$("#f1>div>div>a:nth-child("+n+")");
	// console.log($a1.css("margin-left"));
	 //console.log(-1*$a1.width());

    if(parseInt($a1.css("margin-left"))<-$a1.width()){
   //将margin-left调为0放到最后
	$a1.css("margin-left",0);	
	$a1.css("float","none");	  	
	}else{    
	$a1.css("margin-left",parseInt($a1.css("margin-left"))+m);
	}
 }
//鼠标移入移出事件
$("#f1>div").mouseenter(function(event){
  clearInterval(timer1);
 
});
$("#f1>div").mouseleave(function(){
  Timer1();
});
/*
****************
*鼠标的拖拽功能*
****************
*/
var canMove=false,clientX=0,firstside=0;
$("#f1>div").mousedown(function(e){
  e.preventDefault();
 canMove=true;
 clientX=e.clientX;
     var n=1;
 	for(var i=1;i<$as.length+1;i++){
	 if($("#f1>div>div>a:nth-child("+i+")").css("float")=="left"){
       var n=i; 	
	   break;
    	  
	 }else if(i==$as.length){
	  $as.css("float","left");	 
	 }
	}
	 var $a1=$("#f1>div>div>a:nth-child("+n+")");
 firstside=parseInt($a1.css("margin-left"));
// console.log(clientX);
// console.log(firstside);

});

$("#f1>div").mousemove(function(e){//当鼠标在窗口内移动时
	e.preventDefault();
  if(canMove){//如果开关打开执行鼠标拖动事件
      //找到第一个a元素和最后一个a元素
	  var n=1;
 	for(var i=1;i<$as.length+1;i++){
	 if($("#f1>div>div>a:nth-child("+i+")").css("float")=="left"){
         n=i; 	
	   break;
    	  
	 }else if(i==$as.length){
	  $as.css("float","left");	 
	 }
	}
	 var $first_a=$("#f1>div>div>a:nth-child("+n+")"); 
	 var $last_a=$("#f1>div>div>a:nth-child("+(n==1?$as.length:n-1)+")");
	// console.log(n);
    if(parseInt($first_a.css("margin-left"))<-180){	
     firstside=0; 
	 $first_a.css("margin-left",0);
	 $first_a.css("float","");
    
	}else if(parseInt($first_a.css("margin-left"))>180){   
     firstside=0;
	 if($last_a.css("float")=="float"){$last_a.css("float","");}
	 $first_a.css("margin-left",0);
	 $last_a.css("float","float");      
	}else
	{  
     $first_a.css("margin-left",firstside+(e.clientX-clientX)%(181));
	}
  }
});
//当鼠标在#f1 div上抬起时关闭开关
$("#f1>div ").mouseup(function(e){
	e.preventDefault();
	canMove=false;
});
 //当鼠标离开#f1 div时关闭开关
$("#f1>div ").mouseleave(function(e){
	e.preventDefault();
	canMove=false;
});

/*
**************
*2楼的移动效果
**************
*/
 var bgColor=[["#1C4DC1","#9DB2E5"],["#8C66A3","#52435D"],["#49995C","#46624D"],["#F0AE7A","#675546"]];  
	for(var i=0;i<bgColor.length;i++){
	var $div_first_a=$("#f2>div>div:nth-child("+(i+1)+") a:first-child"); 
	    $div_first_a.css("background",
	"linear-gradient(to bottom,"+bgColor[i][0]+" 0%,"+bgColor[i][1]+" 70%,#fff 71%");
	}
 var nC=0;
 var timer2="";
  Timer2();
 function Timer2(){
 timer2=setInterval(function(){
    flool_2_move();
 },2500); 
 }
$("#f2>div").mouseenter(function(event){
  clearInterval(timer2); 
});
$("#f2>div").mouseleave(function(){
  Timer2();
});
 function flool_2_move(){
  	var $first_div=$("#f2>div>div:first-child");
	 if($first_div.css("margin-left")=="-400px"){
	    $first_div.css("margin-left",0);
        $first_div.parents("#f2>div").append($first_div[0]);	
	 }else{  
     $first_div.css({"margin-left":-400,
		           "transition":"margin-left 1s linear" 
	               });
	 nC==bgColor.length?nC=0:"";
	 $first_div.children(".h").css("background",
	"linear-gradient(to bottom,"+bgColor[nC][0]+" 0%, "+bgColor[nC++][1]+" 70%,#fff 71%"
	 );
	 }	 
 }
$("#f2>a.prev").mousedown(function(e){
	  clearInterval(timer2);
	e.preventDefault();
    flool_2_move();
});
$("#f2>a.prev").mouseup(function(e){
      Timer2();
	e.preventDefault();
    flool_2_move();
});
$("#f2>a.next").mousedown(function(e){
  	  clearInterval(timer2);
	   e.preventDefault();
   	var $last_div=$("#f2>div>div:last-child");
	    $last_div.css("margin-left",-400);
        $last_div.parents("#f2>div").prepend($last_div[0]);	
	
});
$("#f2>a.next").mouseup(function(e){
  	  Timer2();
	e.preventDefault(); 
	var $first_div=$("#f2>div>div:first-child");
     $first_div.css({"margin-left":0,
		           "transition":"margin-left 1s linear" 
	               });
	 nC==-1?nC=bgColor.length-1:"";
	 $first_div.children(".h").css("background",
	"linear-gradient(to bottom,"+bgColor[nC][0]+" 0%, "+bgColor[nC--][1]+" 70%,#fff 71%"
	 );	
});
