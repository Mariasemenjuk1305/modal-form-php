<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- файли bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- підключення іконок edit/delete -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- внутрішній файл .css -->
    <link rel="stylesheet" href="css/style.css">
    <title>Task_3 Modal Form</title>
</head>

<body>
    <div class="container">
      <!-- блок керування -->
      <div class="d-flex justify-content-start m-4">
         <button id="newUser" type="button" class="btn btn-primary btn-sm col-1 m-1" data-toggle="modal"
            data-target="#add">Add User</button>
              <select name="firstSel" class="btn-sm col-2 m-1" required>
                  <option selected disabled value="">Please select</option>
                  <option value="active">Set active</option>
                  <option value="notActive">Set not active</option>
                  <option value="delete">Delete</option>
                </select>
              <button id="ok" name="firstSel" type="button" class="btn btn-sm btn-secondary col-1 m-1 ok">Ok</button>
      </div>

   
          <!-- модальне вікно додати/редагувати користувача -->
        <div id="add" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add new user</h5>
                  <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
                    <!-- <span aria-hidden="true">&times;</span> -->
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                     <?php require 'blocks/modal.php'?>
                  </form>
                </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Close</button>
                      <button type="button" class="btn btn-primary" id="submit">Add</button>
                      <button type="button" class="btn btn-primary d-none" id="update">Save</button>
                  </div>
              </div>
          </div>
        </div>
        <!-- таблиця з даними -->
        <table class="table text-center m-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"><input name="check" type="checkbox" class="form-check-input" id="parent"></th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <?php
              require './connect/auth.php';

              $query = $pdo -> query('SELECT * FROM `users` ORDER BY `id`');
              $result = $query->fetchAll(PDO::FETCH_OBJ); 
              if($result){
                $count = 1;
                foreach($result as $row){
            ?>
                  <tr>
                    <td scope="row"><?= $count ?></td>
                    
                    <td scope="col"><input name="check" type="checkbox" class="form-check-input idNum" value="<?=$row -> id?>" id="child"></td>

                    <td><?= $row -> name?></td>

                    <td><?= $row -> lastname ?></td>

                    <td>
                    <?php
                        if($row -> status == "true"){
                    
                        echo  '<img class="isActive" src="./img/active.png" alt="active">';
                    
                        }else{ 
                  
                        echo  '<img class="isActive" src="./img/notActive.png" alt="not active">';
                    
                        };
                    ?>
                    </td>
                  
                    <td><?= $row -> role ?></td>

                    <td style="width: 20%;">
                      <a href="#" onClick="return false"
                        class="edit table-link" data-id="<?= $row->id ?>" data-toggle="modal"
                        data-target="#add">
                        <span class="fa-stack">
                          <i class="fa fa-square fa-stack-2x"></i> 
                          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                      <a href="#" onClick="return false"
                        class="delete table-link danger" data-id="<?= $row->id ?>" data-toggle="modal" data-target="#confirm">
                        <span class="fa-stack">
                          <i class="fa fa-square fa-stack-2x"></i>
                          <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </td>

                  </tr>
            <?php  
                  $count++;
                  };
                }else{ 
                  echo false;
                };
            ?>
          </tbody>
        </table>
      <!-- блок керування -->
      <div class="d-flex justify-content-start m-4">
         <button id="newUser" type="button" class="btn btn-primary btn-sm col-1 m-1" data-toggle="modal"
            data-target="#add">Add User</button>
              <select name="secondSel" class="btn-sm col-2 m-1" required>
                  <option selected disabled value="">Please select</option>
                  <option value="active">Set active</option>
                  <option value="notActive">Set not active</option>
                  <option value="delete">Delete</option>
                </select>
              <button id="ok" name="secondSel" type="button" class="btn btn-sm btn-secondary col-1 m-1 ok">Ok</button>
      </div>
       
    </div>

       <!-- конфірми -->
       <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="condirmTitle"></h5>
                <button type="button" class="btn-close for-info" data-dismiss="modal" aria-label="Close">
                  <!-- <span aria-hidden="true">&times;</span> -->
                </button>
              </div>
              <div class="modal-body" id="confirmText">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary for-info fade" data-dismiss="modal" aria-label="Close" id="cancel">Cancel</button>
                <button type="button" class="btn btn-primary for-info" id="agree">Ok</button>
                <button type="button" class="btn btn-primary for-info" id="delete">Delete</button>
              </div>
            </div>
          </div>
        </div>

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> -->
    
 
    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>
