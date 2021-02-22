<?php
  require_once '../connect/auth.php';

  $id = $_POST['id'];
 

  if ($id) {
    $sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
  
    $query = $pdo->prepare($sql);
    $query->execute([$id]); 

    echo json_encode(array(
      'result' => true,
      'data' => 1, 
    ));
  }else{
    $error = $pdo->errorInfo();
    echo json_encode(array(
      'result' => false,
      'data' => "Couldn't delete!\n ". "SQL Error={$error[0]}, DB Error={$error[1]} " . "Message={$error[2]}\n", 
  ));
  }
?>
