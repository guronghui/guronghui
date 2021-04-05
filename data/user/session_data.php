<?php
/**
* 返回当前登录用户的信息：
* 如：{"uid":10, "uname":"dingding"}
*/
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Origin:http://localhost:3000');
header('Access-Control-Allow-Credentials:true');
session_start();
@$output['uid'] = $_SESSION['loginUid'];
@$output['name'] = $_SESSION['loginUname'];
@$output['gender'] = $_SESSION['gender'];
echo json_encode($output);