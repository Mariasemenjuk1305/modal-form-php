<?php
    require_once '../connect/auth.php';
    $select = $_POST['select'];
    $checkNum = $_POST['checkElem'];
    $r = [];
    if(isset($_POST['checkElem'])){
        foreach($_POST['checkElem'] as $val){
            $sql = 'SELECT * FROM `users` WHERE `users`.`status`= ? && `users`.`id`= ?  LIMIT 1';
            $query = $pdo->prepare($sql);
            $query->execute([$select, $val]);
            $result = $query->fetchAll(PDO::FETCH_OBJ);
            array_push($r, $result);
        }
        echo json_encode($r);
    }else if(isset($_POST['select'])){
        $sql = 'SELECT * FROM `users` WHERE `users`.`status`= ? ORDER BY `id` DESC';
        $query = $pdo->prepare($sql);
        $query->execute([$select]);
        $result = $query->fetchAll(PDO::FETCH_OBJ);
        array_push($r, $result);
        echo json_encode($r);
    }else{
        echo false;
    }
    
    
?>
       