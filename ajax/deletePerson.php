<?php
  require_once '../connect/auth.php';

  $id = $_POST['id'];
  $sql = "DELETE FROM `users` WHERE `users`.`id` = ?";
  
  $query = $pdo->prepare($sql);
  $query->execute([$id]);

?>
