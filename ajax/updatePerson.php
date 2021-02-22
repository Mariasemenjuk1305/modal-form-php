<?php
  $id = $_POST['id'];

  require_once '../connect/auth.php';

  if ($id) {
    $sql = "SELECT * FROM `users` WHERE `id` = ?";
  
    $query = $pdo->prepare($sql);
    $query->execute([$id]);
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array(
      'result' => true,
      'data' => $result
    ));
   
}else{
  $error = $pdo->errorInfo();
  echo json_encode(array(
    'result' => false,
    'data' => "Couldn't update!\n ". "SQL Error={$error[0]}, DB Error={$error[1]} " . "Message={$error[2]}\n" 
));
}
?>


