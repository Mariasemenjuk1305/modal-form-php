<?php
  $id = $_POST['id'];

  require_once '../connect/auth.php';

  $sql = "SELECT * FROM `users` WHERE `id` = ?";
  
  $query = $pdo->prepare($sql);
  $query->execute([$id]);
  $result = $query->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
?>


