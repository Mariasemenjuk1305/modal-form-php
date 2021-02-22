<?php

$user = 'root';
$password = 'root';
$db = 'usersControl';
$host = 'localhost';

$dsn = 'mysql:host='.$host.';dbname='.$db;

$pdo = new PDO($dsn, $user, $password);




//   try {
//   $host_name = 'db5001716709.hosting-data.io';
//   $database = 'dbs1418665';
//   $user_name = 'dbu1709913';
//   $password = 'madalForm-task3';
//   $dbh = null;
//   $pdo = new PDO("mysql:host=$host_name; dbname=$database;", $user_name, $password);
//   } catch (PDOException $e) {
//     echo "Error!: " . $e->getMessage() . "<br/>";
//     die();
//   };


?>
