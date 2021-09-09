<?php
var_dump($_GET);
// var_dump($_POST);
$name = $_POST["name"];
$age = $_POST["age"]+10;
echo "Hello, ".$name." in 10 years your age will be ".$age;
// $json_arr = ["namePHP"=>$name,"agePHP"=>$age];
// $result['result'] = array_values($arr);
// echo json_encode($json_arr);


// $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);
// echo $data_json;

/*$data_json = json_encode($_GET, JSON_UNESCAPED_UNICODE);
echo $data_json;
*/
?>