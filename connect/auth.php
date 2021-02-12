<?php

$user = 'root';
$password = 'root';
$db = 'usersControl';
$host = 'localhost';

$dsn = 'mysql:host='.$host.';dbname='.$db;

$pdo = new PDO($dsn, $user, $password);

?>
