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
        };
        echo json_encode(array(
            'result' => true,
            'data' => 1, 
          ));
    }else{
        $error = $pdo->errorInfo();
        echo json_encode(array(
            'result' => false,
            'data' => "Couldn't update!\n ". "SQL Error={$error[0]}, DB Error={$error[1]} " . "Message={$error[2]}\n", 
        ));
    };
    
    
?>
       