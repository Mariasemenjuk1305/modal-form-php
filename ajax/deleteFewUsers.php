<?php
  require_once '../connect/auth.php';

  $checkNum = $_POST['checkElem'];
  if(isset($_POST['checkElem'])){
    foreach($checkNum as $val){
        $sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$val]);
    }
  }

?>