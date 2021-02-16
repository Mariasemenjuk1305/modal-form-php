<?php
    require_once '../connect/auth.php';

    if(count($_POST['checkElem'])>0 and isset($_POST['select']) ){
        $select = $_POST['select'];
        $checkNum = $_POST['checkElem'];
        foreach($_POST['checkElem'] as $val){
            $sql = 'UPDATE `users` SET `status` = :status WHERE `id` = :id';
            $query = $pdo->prepare($sql);
            $query->execute(['status'=>$select,
                              'id'=>$val]);
            $result = $query->fetchAll(PDO::FETCH_OBJ);
        };
        echo 'Done';
    }else{
        echo false;
    };
    
    
?>
       