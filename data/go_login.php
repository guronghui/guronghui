<?php
header("Content-Type:application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
$data=["uid"=>1,"uname"=>"王大旭","gender"=>1];
if($uname=="wangdaxu"&&$upwd=="123456"){
 echo json_encode(["code"=>1,"msg"=>"登陆成功","data"=>$data]);
}else{
 echo json_encode(["code"=>-1,"msg"=>"登陆失败","data"=>""]);
}
?>