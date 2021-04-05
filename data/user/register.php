<?php
/**
* 接收客户端
*/
header('Content-Type: application/json;charset=UTF-8');

@$uname = $_REQUEST['uname'] or die('{"code":401,"msg":"uname required"}');
@$upwd = $_REQUEST['upwd'] or die('{"code":402,"msg":"upwd required"}');
@$phone = $_REQUEST['phone'] or die('{"code":404,"msg":"phone required"}');

require_once('../init.php');
$sql = "INSERT INTO xz_user(uname,upwd,phone) VALUES('$uname',md5('$upwd'),'$phone')";
$result = mysqli_query($conn,$sql);

if(!$result){
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $uid = mysqli_insert_id($conn);
  echo('{"code":200, "msg":"register succ", "uid":'.$uid.'}');
}
