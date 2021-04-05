 //加载header
function show_header(show_header_search="block"){
  $("#header").load("00-header.html",()=>{
 var li=document.getElementById("list");
	var as=li.children;
	for(let i=0;i<3;i++){
	  as[i].onclick=function(){
      var active=document.querySelector("#list li.active");
	  if(active!=null){
	   active.className="";
	  }
	   this.className="active";
	  }
    }
//点击时的选择状态

var local=location.href.split('zhuazi-computer/')[1].split('.')[0];
//console.log(local);
if(local=="index"){
 $("#list>li:first-child").css("border-bottom","3px solid #22ac38");
}else if(local=="02_product_list"){
 $("#list>li:nth-child(2)").css("border-bottom","3px solid #22ac38");
}
// 点击#province时显示省份
$("#province>p").click(function(){
 $("#province").css("background","#fff");
 $("div.province_help_list").css("display","block");
});
// 移出div.province_help_list时隐藏省份
$("div.province_help_list").mouseleave(function(){
   $(this).css("display","none");
   $("#province").css("background","none");
});
//点击省份加载到#province中
$("div.province_help_list a").click(function(e){
	  e.preventDefault();
       $("#province>p").html($(this).html()+"∨");
});

/**************************************************************
//登录操作
****************************************************************/
//检查sessionStorage中是否存在登录状态的数据
 var $login_li=$("div.main #list li.go-login");
 var $out_login_li=$("div.main #list li.out-login");
var $login=$("div.main #list li.go-login>a.go_login");
var $zhuazi_login=$("div.zhuazi-login"); 
var $close=$("div.zhuazi-login a.pop-close"); 
  var codeString="";
  var errCount=0;
 //如果存在就直接加载模块
 	var luname=localStorage.getItem("uname");
	var lupwd=localStorage.getItem("upwd");
		$.ajax({
        type:"get",
		url:"data/user/session_data.php",      
        success:function(data){	
       if(data.uid&&data.name&&data.gender ){
		    login_block(data);
		}else{
//实现登录框的显示与取消
		  $login.click(function(e){		   
		   gologin(e);
		  });
	  $close.click(function(e){
	   login_sucess(e);
	  });
	  }
		}
     }); 
	
		function gologin(e){
		   e.preventDefault(); 
//		   将保存的用户信息放入输入框	
             if(luname&&lupwd){             
             $("div.zhuazi-login ul.login-box li.my_memory #my_memory").attr('checked','checked');
			 $("div.zhuazi-login ul.login-box li input.uname").val(luname);	
		    $("div.zhuazi-login ul.login-box li input.upassward").val(lupwd);	
			 }  
//			放入验证吗       
           getCode();

		//    $zhuazi_login.css("z-index","15");
		//    $zhuazi_login.css("display","block");
			$zhuazi_login.css({"z-index":"15","display":"block"});
			var h=document.body.clientHeight+"px";
		//    $("#hiden_bg").css("height",h); 
		//    $("#hiden_bg").css("z-index",14);
		//    $("#hiden_bg").css("display","block");	
    

		 $("#hiden_bg").css({"height":h,"z-index":"14","display":"block"});
		  $("html,body").css({overflow:"hidden"}); //禁用滚动条  
		}
function login_sucess(e){
  e.preventDefault(); 
//    $zhuazi_login.css("z-index","0");
//    $zhuazi_login.css("display","none");
//    $("#hiden_bg").css("height",0);
//    $("#hiden_bg").css("z-index",0);
//    $("#hiden_bg").css("display","none");
   $zhuazi_login.css({"z-index":"0","display":"none"});
   $("#hiden_bg").css({"height":0,"z-index":"0","display":"none"});
   $("html,body").css({overflow:"auto"}); //显示滚动条  
}
  //点击提交登录成功之后出现跳转背景，失败提示。
 var $login_success=$("div.zhuazi-login input.sub-btn");
 var $login_save=$("div.zhuazi-login ul.login-box li.my_memory #my_memory");

  $login_success.click(function(e){
         e.preventDefault();		 
	var uname=$("div.zhuazi-login ul.login-box li input.uname").val();	   
	var upwd=$("div.zhuazi-login ul.login-box li input.upassward").val();
	var ucode=$("div.zhuazi-login ul.login-box li input.ucode").val();
	var login_code=$("div.zhuazi-login ul.login-box li.login-code");
	var p_error=$(this).siblings("p.p-error");
	if(uname ==""||upwd ==""){		
	     p_error.html('请输入用户名或密码...');
         $login_success.blur(function(){		 		
		  p_error.html('');
		});
	 return;
	}else if(errCount>=3&&ucode==""){
      login_code.css("display","block");
		     p_error.html('验证码不能为空');
         $login_success.blur(function(){		 		
		  p_error.html('');
		});
		 return;
	}else if(errCount>=3&&ucode!=codeString){
		login_code.css("display","block");
	   p_error.html('验证码错误');
         $login_success.blur(function(){		 		
		  p_error.html('');
		});
		 return;
	
	}
  // console.log(ucode,codeString);
	//是否保存登录记录。下次直接登录   	 
	  if($login_save.is(":checked")){
		localStorage.setItem("uname",uname);
		localStorage.setItem("upwd",upwd);
		}
	$.ajax({
        type:"post",
		url:"data/user/login.php",
        data:{uname:uname,upwd:upwd},
        success:function(data){
      // console.log(data);		
	 //登录验证
	 if(data.code==200){
	    $zhuazi_login.css({"z-index":"0","display":"none"});
	    $("#hiden_bg").css("opacity",0.5);				
// //判断保存在localStorage中，使用户记住登录状态
         
       //调用登录模块函数 
		login_block(data.data);
 //登录成功之后弹出背景跳转
      $("#hiden_bg").html("恭喜您，登录成功......<br>2s后返回本页......");	 
      var i=1;
	  var timer=setInterval(function(){
		if(i==0){
			$login.html();
		 login_sucess(e);
		}   
	   $("#hiden_bg").html("恭喜您，登录成功......<br>"+(i--)+"s后返回本页......");
	  },1000);
	  }else{
 //登录失败之后，提示重新登录
//    记录次数
	  errCount++;
	  $zhuazi_login.css({"z-index":"0","display":"none"});
      $("#hiden_bg").css("opacity",0.5);
      $("#hiden_bg").html("登录失败，用户名或者密码错误，点击<br><a href='javascript:' class='repeat_login'>重新登录<a>");
	 $("#hiden_bg a.repeat_login").click(function(e){gologin(e);});
	  }
	 },
    error:function(){
  //登录网络问题
      $zhuazi_login.css({"z-index":"0","display":"none"});
      $("#hiden_bg").css("opacity",0.5);
      $("#hiden_bg").html("登录失败，可能是网络问题，请仔细检查网络，点击<br><a href='javascript:' class='repeat_login'>重新登录<a>");
	 $("#hiden_bg a.repeat_login").click(function(e){gologin(e);});
	 }
   });
   }); 


  //加载登录模块函数
   function  login_block(data){
	   //console.log(data.name);
	   if(data.name==null){data.name='*'}
	   $login_li.html(`
		  欢迎 <span>${data.name.slice(0,1)}**${(data.gender=="1")?"先生":"女士"}</span><a href='javascript:;' class='my_login'></a>  
	   `);
	//  登录之后的头像弹框操作 点击弹出与消失
		 var  $login_control=$("#login_control");
		   $login_control.click(function(){
			$(this).css("height",0);
		   });
		 var $my_login=$("div.main #list li.go-login a.my_login");
		   $my_login.click(function(){
		   $login_control.css("height",250);
		   });
   //加入用户个人操作模块
        var $login_control=$("div.login_control");
		$login_control.html(`
		    <ul>
                <li>你好！<span href="">${data.uname}</span>先生!                     
                </li>               
                <li><hr></li>                           
                <li><a href="" >个人中心</a></li>
                <li><a href="" >修改密码</a></li>
                <li><a href="" >我的收藏</a></li>               
                <li><a href="" >购物车</a></li>               
            </ul>	
		`);
   ////加入注销按钮
	  	$out_login_li.html(`
		  <a href='javascript:;' class="out_login">注销</a>  
	  `);
   }
/***
*******************************************************************************
//退出操作
*******************************************************************************/
 //退出时的弹框操作
   var choose=document.querySelectorAll("#out_point input[name=out_choose]");  
    var choose_label=document.querySelectorAll("#out_point label");      
   for(let i=0;i<2;i++){
   choose[i].onclick=chooseOk(out_choose,cancel_choose);
    }   
 //执行选中状态的操作
function chooseOk(out_choose,cancel_choose){
 return function(){
    for(let i=0;i<2;i++){
      if(choose[i].checked){
        (choose[i].value)=="1"?out_choose():cancel_choose(); 
        for(let i=0;i<2;i++ ){
         choose_label[i].className="not_choose_active";
        }
        choose_label[i].className="choose_active";
      };
    }
 }
}
   var out_point=document.querySelector("#out_point");
 function out_choose(){
	       localStorage.removeItem("uname");
           localStorage.removeItem("upwd");   
			$.ajax({
			type:"get",		
			url:"data/user/logout.php",      
			success:function(data){	
				console.log(typeof(data));
				console.log(data);
			 if(data.code == 200){
				 console.log(12);
			 location.reload();
			 }
			}
			});		 
    }
  function cancel_choose(){         
     out_point.className="out_point_close";
    }
  //绑定注销事件
   var $out_login_li=$("div.main #list li.out-login");
       $out_login_li.on("click","a.out_login",function(){ 		   
         out_point.className="out_point_show";	   
	    for(let i=0;i<2;i++ ){
         (choose[i].checked)?choose[i].focus():"";
        }
		 choose[0].onkeypress=function(event){
			if(event.which == 13) { 
			out_choose();
			}
		};
         	choose[1].onkeypress=function(event){
			if(event.which == 13) { 
			cancel_choose();
			}
		};

	   });
	   $("#header_search").css("display",show_header_search);
  //点击 全部分类 时将分类展示出来
     $("#header_all_classify").click(function(){
	  var $classify=$("#help_classify");
	  if($classify.css("display")=="none"){
	   $(this).find("img").css("transform","rotate(180deg)");
	   $classify.css("display","block");
	  }else{
	   $classify.css("display","none");
	     $(this).find("img").css("transform","rotate(0deg)");
	  }
	 
	 })
  //header中的输入框点击时的收索功能 
	$("#header_search_box>span").click(function(){     
	  var val=$(this).siblings("input").val();
	  location.href="02_product_list.html?kw="+$.trim(val);
     })
  //动态获取收索信息
    $("#header_search_box>input").keyup(function(){ 	
 	   var kw=$.trim($(this).val());	  
	 //  console.log(kw);
	   if(kw==""){ 
		   $("#help_search").html("");	
		   return; }
	  $.ajax({
    url: 'data/product/list.php',
    data: {pno:1, kw:kw},
    success: function(pager){
		var html="";
	    for(var i=0;i<5;i++){
         if(pager.data[i]){
		 var title=pager.data[i].title;
         var lid=pager.data[i].lid;
         // console.log(title);
		 html+=`
			 <p><a href="03_product_details.html?lid=${lid}">${title}</a></p>
			  `;
		 }
		 }
		html!=""?html+=`<p><a  href="javascript:;" class="close_help">关闭</a></p>`:"none";
		// console.log(html);
		 $("#help_search").html(html);		
		
			//点击关闭时清除所有输入
		$("div.help_search a.close_help").click(function(){		 			
	       $(" div.header_search_box>input").val("");	
		   $("#help_search").html("");		
		});	

	    }
	  });
	   
    }); 
	
///获取验证码
function getCode(){
	   ///放入验证码
	         var code=`
			   <svg width="200" height="50" style="background:gray" id="cc">
               </svg><span>换一张</span>
			 `;
		  $("div.zhuazi-login ul.login-box li a.code").html(code);
		  //		   点击时换验证码
           $("div.zhuazi-login ul.login-box li a.code>span").click(function(){ getCode();});
       function rn(min,max){
     return parseInt(Math.random()*(max-min)+min);
     }
    var x=0,y=0;
    var html="";
    for(var i=0;i<100;i++){
       var x=rn(0,200);
       var y=rn(0,50);
       var r=rn(80,255);
       var g=rn(80,255);
       var b=rn(80,255);
       html += `<circle cx="${x}" cy="${y}" r="1" fill="rgb(${r},${g},${b})">
        </circle>`;
    }

    for(var i=0;i<5;i++){
        var  x1=rn(0,200);
        var  x2=rn(0,200);
        var y1=rn(0,50);
        var  y2=rn(0,50);
        var r=rn(80,255);
        var g=rn(80,255);
        var b=rn(80,255);
        html += ` <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
  style="stroke:rgb(${r},${g},${b});stroke-width:2"/>`;
    }
    codeString="";
    for(var i=0;i<4;i++){
        var x=rn(i*30+20,i*30+30);
        var y=rn(20,30);
        var r=rn(80,255);
        var g=rn(80,255);
        var b=rn(80,255);
        var pool="ABCDEFGHIJKLMN0123456789abcdefghijklmn";
        var n=rn(0,pool.length);
		 codeString += pool[n];		
        html += ` <text x="${x}" y="${y}" fill="rgb(${r},${g},${b})"
         style="font-size:30px" >${pool[n]}</text>
        `;
    }		
    cc.innerHTML=html;
   }

  })
}