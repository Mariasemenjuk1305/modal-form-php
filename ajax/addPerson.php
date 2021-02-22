<?php

    $username =trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
    $lastName =trim(filter_var($_POST['lastName'], FILTER_SANITIZE_STRING));
    $isAdmin =trim(filter_var($_POST['role'], FILTER_SANITIZE_STRING));
    $activePerson = $_POST['status'];
  
    $message = '';
    if(strlen($username) <= 3)
      $message = 'Please, tell your name!';
    else if(strlen($lastName) <= 3)
      $message = 'Please, tell your last name!';
    else if(strlen($isAdmin) == '')
      $message = 'Please, choice your role!';
  
    require_once '../connect/auth.php';
    
    if($message != ''){
      echo json_encode(array(
        'result' => false,
        'data' => 'Incorrect value: '. $message, 
      ));
    }else{
      $sql = 'INSERT INTO users(name, lastname, status, role) VALUES(?, ?, ?, ?)';
      $query = $pdo->prepare($sql);
      $query->execute([$username, $lastName, $activePerson, $isAdmin]);
      echo json_encode(array(
        'result' => true,
        'data' => 1, 
      ));
    }

 ?>