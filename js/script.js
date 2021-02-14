$(document).ready(function () {
  // наповнення для модального вікна - додати користувача
  $(document).on("click", "#newUser", function(){
    $('#exampleModalLabel').text('Add new user');
    $('#update').addClass('d-none');
    $('#submit').removeClass('d-none');
    $('form').get(0).reset();
    $('#errorBlock').addClass('d-none');
  });
  
  // вибрати всі checkbox
  $('#parent').click(function () {
    if (!$("#parent").is(":checked")) {
      $(".idNum").prop('checked', false);
    } else {
      $(".form-check-input").prop("checked", "checked");
    }
  });
  //віджати головний checkbox, якщо хоч один вибраний
  $(document).on("click", ".idNum", function(){
    $("#parent").prop('checked', false);
  });

  //додати користувача
  $('#submit').click(function () {
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
          $('#add').modal('hide');
          // конфірм підтвердження
          $('#confirm').modal('show');
          $('#errorBlock').addClass('d-none');
          $('#condirmTitle').text('Add new User');
          $('#confirmText').text('User is successfully added!');
          $('#agree').text('Ok');
          $('.for-info').click(()=>{
            location.reload(true);
          });
        } else { 
            //показувати помилку
            $('#errorBlock').removeClass('d-none');
            $('#errorBlock').text(data);
        }
      }
    });
  });

  //видалити користувача 
  $(document).on("click", ".delete", function(){
      $('#condirmTitle').text('Delete User');
      $('#confirmText').text('Are you sure you want to delete this user?');
      $('#agree').text('Delete');
      $('#agree').click(()=>{
        let id = $(this).data("id");
        $.ajax({
            url: "./ajax/deletePerson.php",
            type: "POST",
            data: {'id': id},
            success: () =>
            {
              //конфірм підтвердження
              $('#condirmTitle').text('User delete!');
              $('#confirmText').text('User is successfully deleted!');
              $('#agree').text('Ok');
              $('.for-info').click(()=>{
                location.reload(true);
              });
            }
        });
      });  
  });

  //редагувати дані юзера 
  $(document).on("click", ".edit", function(){
    let id = $(this).data("id");
    // показати/заховати модальне вікно
    $('#update').removeClass('d-none');
    $('#submit').addClass('d-none');
    $('#exampleModalLabel').text('Edit user`s info')
    $('#errorBlock').addClass('d-none');
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

  //update дані в таблиці mysql
  $('#update').click(function () { 
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
        if (data == 'Done') {
          $('#active').attr('checked', false);
          //для конфірму
          $('#add').modal('hide');
          $('#confirm').modal('show');
          $('#condirmTitle').text('Update User');
          $('#confirmText').text('User`s info is successfully updated!');
          $('#agree').text('Ok');
          $('.for-info').click(()=>{
            location.reload(true);
          });  
        } else {
          //показавати помилку
          $('#errorBlock').removeClass('d-none');
          $('#errorBlock').text(data);
        }
      }
    });
  });

  // Згідно із значенням селекту
  $('.ok').click(function(){  
    //яке значення  селекту було вибране
    let select;
    if($('select[name="firstSel"]').val()){
       select = $('select[name="firstSel"]').val();
    }else if($('select[name="secondSel"]').val()){
      select = $('select[name="secondSel"]').val();
    }else{
      $('#confirm').modal('show');
      $('#condirmTitle').text('Select actions');
      $('#confirmText').text('You have to select some actions');
      $('#agree').text('Ok');
      $('#agree').click(()=>{$('#confirm').modal('hide');});
    }
    //очистити значення селекту
    $('select').each(()=>{
      $('select').val('');
    })
    if (select == 'active'){
      select = true;
    }
    if(select == 'notActive'){
      select = false;
    }

    //котрі з checkbox вибрані  
    let checkElem = [];
    $('.idNum').map((element, index) => {
      if(index.checked){
        checkElem.push(index.value);
      }
    }); 
    
    //видалити кількох користувачів
    if(select == 'delete' && checkElem.length>0){
      if(checkElem.length != 0){
        $('#confirm').modal('show');
        $('#condirmTitle').text('Delete User');
        $('#confirmText').text('Are you sure you want to delete this user(s)?');
        $('#agree').text('Delete');
        $('#agree').click(function(){
          $.ajax({
            url: './ajax/deleteFewUsers.php',
            type: "POST",
            cache: false,
            data: {'checkElem':checkElem},
            success: () => {
              $('#condirmTitle').text('Delete User');
              $('#confirmText').text('User`s is successfully deleted!');
              $('#agree').text('Ok');
              $('.for-info').click(()=>{
                location.reload(true);
              });  
            }
          });
        });
      }
    }else if(select == 'delete' && checkElem.length == 0){
      $('#confirm').modal('show');
      $('#condirmTitle').text('Delect users');
      $('#confirmText').text('You have to select some users');
      $('#agree').text('Ok');
      $('#agree').click(()=>{$('#confirm').modal('hide');});
    }else{
    //сортувати активний/неактивний 
      $.ajax({
        url: './ajax/selectPart.php',
        type: "POST",
        cache: false,
        data: {'select': select,
                'checkElem':checkElem},
        success: (data) => {
          data = JSON.parse(data);
          let str;
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
                              <td scope="col"><input name="check" type="checkbox" 
                                class="form-check-input idNum" value="${data[i][j].id}" id="child">
                              </td>
                              <td>${data[i][j].name}</td>
                              <td>${data[i][j].lastname}</td>
                              <td>${status}</td>     
                              <td>${data[i][j].role}</td>
                              <td style="width: 20%;">
                                <a href="#" onClick="return false"
                                  class="edit table-link" data-id="${data[i][j].id}" 
                                  data-toggle="modal"
                                  data-target="#add">
                                  <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i> 
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>
                                <a href="#" onClick="return false"
                                  class="delete table-link danger" data-id="${data[i][j].id}" 
                                  data-toggle="modal" 
                                  data-target="#confirm">
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
    }     
  });
});