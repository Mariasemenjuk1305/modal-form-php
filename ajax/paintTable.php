<?php
    require '../connect/auth.php';

    $query = $pdo -> query('SELECT * FROM `users` ORDER BY `id`');
    $result = $query->fetchAll(PDO::FETCH_OBJ); 

    if (false === $result) {
        $error = $pdo->errorInfo();
        echo json_encode(array(
            'result' => false,
            'data' => "Couldn't create table!\n ". "SQL Error={$error[0]}, DB Error={$error[1]} " . "Message={$error[2]}\n", 
        ));
    }else{
        echo json_encode(array(
            'result' => true,
            'data' => $result
          ));
    }

?>