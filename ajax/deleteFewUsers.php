<?php
  require_once '../connect/auth.php';

  $checkNum = $_POST['checkElem'];
  if(isset($_POST['checkElem'])){
    foreach($_POST['checkElem'] as $val){
        $sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
        $query = $pdo->prepare($sql);
        $query->execute([$val]);
    }
  }

?>