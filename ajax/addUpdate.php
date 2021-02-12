<?php
  $username =trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
  $lastName =trim(filter_var($_POST['lastName'], FILTER_SANITIZE_STRING));
  $isAdmin =trim(filter_var($_POST['role'], FILTER_SANITIZE_STRING));
  $activePerson = $_POST['status'];
  $id = $_POST['id'];

  $error = '';
  if(strlen($username) <= 3)
    $error = 'Please, enter your name';
  else if(strlen($lastName) <= 3)
    $error = 'Please, enter your last name';
  else if(strlen($isAdmin) == '')
    $error = 'Please, choice your role';

  if($error != ''){
    echo $error;
    exit();
  }

  require_once '../connect/auth.php';
  
  $sql = "UPDATE `users` SET `name` = '$username', `lastname` = '$lastName', `status` = '$activePerson', `role` = '$isAdmin' WHERE `users`.`id` = ?";
  
  $query = $pdo->prepare($sql);
  $query->execute([$id]);

?>