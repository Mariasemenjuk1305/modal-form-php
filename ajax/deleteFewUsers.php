<?php
  require_once '../connect/auth.php';

  $checkNum = $_POST['checkElem'];
  if(isset($_POST['checkElem'])){
    foreach($checkNum as $val){
        $sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$val]);
    }
    echo json_encode(array(
      'result' => true,
      'data' => 1, 
    ));
  }else{
    $error = $db->errorInfo();
    echo json_encode(array(
      'result' => false,
      'data' => "Couldn't delete!\n ". "SQL Error={$error[0]}, DB Error={$error[1]} " . "Message={$error[2]}\n", 
  ));
  }

?>