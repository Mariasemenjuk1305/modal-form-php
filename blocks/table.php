   <?php
      require_once './ajax/paintTable.php';
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
                  class="edit table-link" data-id="<?= $row->id ?>">
                  <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i> 
                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
                <a href="#" onClick="return false"
                 class="delete table-link danger" data-id="<?= $row->id ?>">
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
        }else echo false;
    ?>
