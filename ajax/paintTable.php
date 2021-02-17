<?php
require '../connect/auth.php';

    $query = $pdo -> query('SELECT * FROM `users` ORDER BY `id` DESC');
    $result = $query->fetchAll(PDO::FETCH_OBJ); 

    echo json_encode($result);

?>