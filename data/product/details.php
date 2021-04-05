<?php
/**
* 根据产品编号lid查询商品的所有信息
* 参数： lid
* 返回：{
*     "details":{ ..., "picList":[{},...] }
*     "family":{ "fid":.., "fname":.., "laptopList":[ {"lid":..,"spec":..},... ]}
*  }
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../init.php');
@$lid = $_REQUEST['lid'];
if(!$lid){
  $lid = 1;
}


$output = [
  'details'=>[],
  'family'=>[]
];
//读取笔记本商品的信息
$sql = "SELECT * FROM xz_laptop WHERE lid=$lid";
$result = mysqli_query($conn, $sql);
$output['details'] = mysqli_fetch_assoc($result);

//读取笔记本商品的图片列表
$sql = "SELECT * FROM xz_laptop_pic WHERE laptop_id=$lid ORDER BY pid";
$result = mysqli_query($conn, $sql);
//$output['details']['picList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
$picList1=array();
while($pic=mysqli_fetch_array($result)){
	$picList1[]=$pic;
	};
$output['details']['picList'] = $picList1;
//读取型号信息
$fid = $output['details']['family_id'];
$sql = "SELECT * FROM xz_laptop_family WHERE fid=$fid";
$result = mysqli_query($conn, $sql);
$output['family'] = mysqli_fetch_assoc($result);

//读取同型号的其它笔记本规格
$sql = "SELECT lid,spec FROM xz_laptop WHERE family_id=$fid";
$result = mysqli_query($conn, $sql);
//$output['family']['laptopList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
$array=array();
while($re=mysqli_fetch_array($result)){
	$array[]=$re;
	};
$output['details']['laptopList'] = $array;
echo json_encode($output);
