$(document).ready(function () {
  // показати/заховати модальне вікно
  $('#add').click(() => {
    $('#myModal').modal('toggle');
    $('#update').hide();
    $('#submit').show();
    $('#errorBlock').hide();
  });
  // вибрати всі checkbox
  $('#parent').click(function () {
    if (!$("#parent").is(":checked")) {
      $(".form-check-input").removeAttr("checked");
    } else {
      $(".form-check-input").prop("checked", "checked");
    }
  });
  //віджати головний checkbox, якщо хоч один вибраний
  $(document).on("click", ".idNum", function(){
    $("#parent").removeAttr("checked");
  });

  //додати користувача
  $('#submit').click(function () {
    $('#errorBlock').hide();
    let username = $('#name').val();
    let lastName = $('#lastName').val();
    let isAdmin = $('#admin').val();
    let isActive;
    if ($('#active').prop('checked')) {
      isActive = true;
    } else {
      isActive = false;
    }; 
    $.ajax({
      url: './ajax/addPerson.php',
      type: 'POST',
      cache: false,
      data: {
        'name': username,
        'lastName': lastName,
        'status': isActive,
        'role': isAdmin
      },
      dataType: 'html',
      success: function (data) {
        if (data == 'Done') {
          $('#errorBlock').hide();
          location.reload(true);
        } else {
          $('#errorBlock').show();
          $('#errorBlock').text(data);
          alert(data);
        }
      }
    });
  });

  //видалити юзера 
  $(document).on("click", ".delete", function(){
      let ask = confirm('Ви справді хочете видалити користувача?');
      if(ask){
        let id = $(this).data("id");
        $.ajax({
            url: "./ajax/deletePerson.php",
            type: "POST",
            data: {'id': id},
            success: () =>
            {
               alert('Користувача видалено!');
               location.reload(true);
            }
        });
      }else{
        return false;
      }
  });

  //редагувати дані юзера 
  $(document).on("click", ".edit", function(){
    let id = $(this).data("id");
    // показати/заховати модальне вікно
    $('#myModal').modal('toggle');
    $('#submit').hide();
    $('#errorBlock').hide();
    $('#update').show();
    $.ajax({
        url: "./ajax/updatePerson.php",
        type: "POST",
        data: {'id': id},
        success: function(result){
          let arr = JSON.parse(result);
          //console.log(arr[0]);
          $('#idUser').val(arr[0]['id']);
          $('#name').val(arr[0]['name']);
          $('#lastName').val(arr[0]['lastname']);
          if(arr[0]['status'] === 'true'){
            $('#active').attr('checked', true)
          }else{
            $('#active').attr('checked', false)
          };
          $('#admin').val(arr[0]['role']);
        }
    });
  });

  //update дані з таблиці mysql
  $('#update').click(function () {
    $('#myModal').modal('toggle');
    $('#update').show();
    $('#submit').hide();
    
    let idUser = $('#idUser').val();
    let username = $('#name').val();
    let lastName = $('#lastName').val();
    let isAdmin = $('#admin').val();
    let isActive;
    if ($('#active').attr('checked', true)) {
      isActive = true;
    } else {
      isActive = false;
    };
    location.reload(true);
    
    $.ajax({
      url: './ajax/addUpdate.php',
      type: 'POST',
      cache: false,
      data: {
        'id': idUser,
        'name': username,
        'lastName': lastName,
        'status': isActive,
        'role': isAdmin
      },
      dataType: 'html',
      success: function (data) {
        if (data == false) {
          $('#active').attr('checked', false)
          $('#errorBlock').hide();
          $('form').trigger('reset');
          alert('Дані користувача оновлені!')
        } else {
          $('#errorBlock').show();
          $('#errorBlock').text(data);
        }
      }
    });
  });

  // Згідно із значенням селекту
  $('#ok').click(function(){  
    let select = $('#select').val();
    let checkElem = [];
    if(checkElem.length == 0){
      alert('Немає обраних користувачів');
    }else{
      $('.idNum').map((element, index) => {
        if(index.checked){
          checkElem.push(index.value);
        }
      });
    }
  
    //видалити кількох користувачів
    if(select == 'delete'){
      let ask = confirm('Ви впевнені, що хочете видалити користувачів?');
      if(ask){
        $.ajax({
          url: './ajax/deleteFewUsers.php',
          type: "POST",
          cache: false,
          data: {'checkElem':checkElem},
          success: () => {
            alert('Користувачі видалені');
            location.reload(true);
          }
        });
      };
    }else{
      return false;
    }
    //сортувати активний/неактивний
    if (select == 'active'){
      select = true;
    }
    if(select == 'notActive'){
      select = false;
    }
    console.log(select);
        $.ajax({
            url: './ajax/selectPart.php',
            type: "POST",
            cache: false,
            data: {'select': select,
                   'checkElem':checkElem},
            success: (data) => {
              data = JSON.parse(data);
              let str;
              console.log(data);
              let count = 1;
              for (let i=0; i<data.length; i++){ 
                for(let j=0; j<data[i].length; j++){
                  let status;
                  if (data[i][j].status == 'true'){
                      status = '<img class="isActive" src="./img/active.png" alt="active">';
                  };
                  if (data[i][j].status == 'false'){
                    status = '<img class="isActive" src="./img/notActive.png" alt="not active">';
                  };
                   str += `<tr>
                                  <td scope="row">${count}</td>
                                  <td scope="col"><input name="check" type="checkbox" class="form-check-input idNum" value="${data[i].id}" id="child"></td>
                                  <td>${data[i][j].name}</td>
                                  <td>${data[i][j].lastname}</td>
                                  <td>${status}</td>     
                                  <td>${data[i][j].role}</td>
                                  <td style="width: 20%;">
                                    <a href="#" onClick="return false"
                                      class="edit table-link" data-id="${data[i][j].id}">
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i> 
                                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                    <a href="#" onClick="return false"
                                    class="delete table-link danger" data-id="${data[i][j].id}">
                                      <span class="fa-stack">
                                        <i class="fa fa-square fa-stack-2x"></i>
                                        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                  </td>
                                  </tr>`;
                  count++;
                }
              };
              $('tbody').html(str);
            }
        });
      });
});