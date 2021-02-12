<?php
  $username =trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
  $lastName =trim(filter_var($_POST['lastName'], FILTER_SANITIZE_STRING));
  $isAdmin =trim(filter_var($_POST['role'], FILTER_SANITIZE_STRING));
  $activePerson = $_POST['status'];

  $error = '';
  if(strlen($username) <= 3)
    $error = 'Будь ласка, вкажіть Ваше ім\'я';
  else if(strlen($lastName) <= 3)
    $error = 'Будь ласка, вкажіть Ваше прізвище';
  else if(strlen($isAdmin) == '')
    $error = 'Будь ласка, вкажіть Вашу роль';

  if($error != ''){
    echo $error;
    exit();
  }

  require_once '../connect/auth.php';


  $sql = 'INSERT INTO users(name, lastname, status, role) VALUES(?, ?, ?, ?)';
  $query = $pdo->prepare($sql);
  $query->execute([$username, $lastName, $activePerson, $isAdmin]);

  echo 'Done';

 ?>