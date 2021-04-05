<?php
/**
* 添加到购物车
*/
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Origin:http://localhost:3000');
header('Access-Control-Allow-Credentials:true');

@$lid = $_REQUEST['lid'] or die('{"code":401,"msg":"lid required"}');
@$buyCount = $_REQUEST['buyCount'] or die('{"code":402,"msg":"buyCount required"}');
require_once('../init.php');
session_start();
if(! @$_SESSION['loginUid']){
  $_SESSION['pageToJump'] = 'cart.html';
  $_SESSION['toBuyLid'] = $lid;
  $_SESSION['toBuyCount'] = $buyCount;
  die('{"code":300, "msg":"login required"}');
}


$sql = "SELECT cid FROM xz_shopping_cart WHERE user_id=$_SESSION[loginUid] AND product_id=$lid";
$result = mysqli_query($conn, $sql);
if( mysqli_fetch_row($result) ){
  $sql = "UPDATE xz_shopping_cart SET count=count+1 WHERE user_id=$_SESSION[loginUid] AND product_id=$lid";
}else {
  $sql = "INSERT INTO xz_shopping_cart VALUES(NULL, $_SESSION[loginUid], $lid, $buyCount)";
}
$result = mysqli_query($conn, $sql);
if($result){
  echo '{"code":200, "msg":"add succ"}';
}else {
  echo '{"code":500, "msg":"add err"}';
}
