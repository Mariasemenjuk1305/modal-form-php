$(document).ready(function () {
 //вивести дані одного користувача
  function addTr(data, count){
    let status;
    if(data.status == "true"){     
      status = '<img class="isActive" src="./img/active.png" alt="active">';
      }else{ 
        status ='<img class="isActive" src="./img/notActive.png" alt="not active">';
    };
    return `<tr>
    <td scope="row">${count}</td>
    <td scope="col"><input name="check" type="checkbox" 
      class="form-check-input idNum" value="${data.id}" id="child">
    </td>
    <td>${data.name}</td>
    <td>${data.lastname}</td>
    <td>${status}</td>     
    <td>${data.role}</td>
    <td style="width: 20%;">
      <a href="#" onClick="return false"
        class="edit table-link" data-id="${data.id}" 
        data-toggle="modal"
        data-target="#add">
        <span class="fa-stack">
          <i class="fa fa-square fa-stack-2x"></i> 
          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
        </span>
      </a>
      <a href="#" onClick="return false"
        class="delete table-link danger" data-id="${data.id}" 
        data-toggle="modal" 
        data-target="#confirm">
        <span class="fa-stack">
          <i class="fa fa-square fa-stack-2x"></i>
          <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
        </span>
      </a>
    </td>
  </tr>`;
  }
 //вивести дані з БД
  function paintTable(){
    $.ajax({
      url: './ajax/paintTable.php',
      type: 'POST',
      cache: false,
      data: {},
      dataType: 'html',
      success: function (data) {
        let res = JSON.parse(data);
        if (res.result === true) {
          let str = '';
          let count = 1;
          for(let i=0; i<res.data.length; i++){
            str += addTr(res.data[i], count);
            count++;
          }
          $('tbody').html(str);
        }else{
          $('body').html(res.data);
        } 
      }
    });
  };

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
    ifAllCheckCheched()
  });
  // присвоїти checked головному checkbox якщо всі вибрані
  function ifAllCheckCheched(){
    let a = [];
    $('.idNum').each(function(){
      if($(this).is(":checked")){
        a.push($(this))
      };
    });
    if (a.length == $('.idNum').length){
      $("#parent").prop('checked', true);
    };
  };  

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
        let res = JSON.parse(data);
        if (res.result === true) {
          $('#errorBlock').addClass('d-none');
          //перемалювати таблицю
          paintTable();
          $('#add').modal('hide'); 
          $("#parent").prop('checked', false);
        }else{
          $('#errorBlock').removeClass('d-none');
          $('#errorBlock').text(res.data);
        }
      }
    });
  });

  //видалити користувача 
  $(document).on("click", ".delete", function(){
      $('#condirmTitle').text('Delete User');
      $('#confirmText').text('Are you sure you want to delete this user?');
      $('#cancel').removeClass('fade');
      $('#delete').removeClass('d-none');
      $('#agree').addClass('d-none');
      $('#delete').click(()=>{
        let id = $(this).data("id");
        $.ajax({
            url: "./ajax/deletePerson.php",
            type: "POST",
            data: {'id': id},
            success: (data) =>{
              let res = JSON.parse(data);
              if (res.result == true) {
                //Закрити конфірм
                  $('#confirm').modal('hide');
                  $("#parent").prop('checked', false);
                //перемалювати таблицю
                paintTable();
              }else{
                $('body').html(res.data);
              }
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
        success: function(data){
          let res = JSON.parse(data);
          if (res.result == true) {
            //console.log(arr[0]);
            $('#idUser').val(res.data[0]['id']);
            $('#name').val(res.data[0]['name']);
            $('#lastName').val(res.data[0]['lastname']);
            if(res.data[0]['status'] == 'true'){
              $('#active').prop('checked', true)
            }else{
              $('#active').prop('checked', false)
            };
            $('#admin').val(res.data[0]['role']);
          }else{
            $('body').html(res.data);
          }
        
        }
    });
  });

  //update дані в таблиці mysql
  $('#update').click(function () { 
    let idUser = $('#idUser').val();
    let username = $('#name').val();
    let lastName = $('#lastName').val();
    let isAdmin = $('#admin').val();
    let isActive = $('#active').prop('checked');
    
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
        let res = JSON.parse(data);
        if (res.result == true) {
          $('#errorBlock').addClass('d-none');
          //перемалювати таблицю
          paintTable();
          $('#add').modal('hide'); 
          $("#parent").prop('checked', false);
        }else{
          $('#errorBlock').removeClass('d-none');
          $('#errorBlock').text(res.data);
        }
      }
    });
  });

  // Згідно із значенням селекту
  $(document).on("click", ".ok", function(){ 
    //яке значення  селекту було вибране
    let nameButton = $(this).prop('name');
    let select;
    if($('select[name="firstSel"]').val() && nameButton == 'firstSel'){
        select = $('select[name="firstSel"]').val();
    }else if($('select[name="secondSel"]').val() && nameButton == 'secondSel'){
        select = $('select[name="secondSel"]').val();
    }else{
      $('#confirm').modal('show');
      $('#cancel').addClass('fade');
      $('#delete').addClass('d-none');
      $('#agree').removeClass('d-none');
      $('#condirmTitle').text('Select actions');
      $('#confirmText').text('You have to select some actions');
      $('#agree').click(()=>{$('#confirm').modal('hide');});
    }

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
    if(checkElem.length != 0){
      if(select == 'delete'){
          $('#confirm').modal('show');
          $('#condirmTitle').text('Delete User');
          $('#confirmText').text('Are you sure you want to delete this user(s)?');
          $('#agree').addClass('d-none');
          $('#delete').removeClass('d-none');
          $('#cancel').removeClass('fade');
          $('#delete').click(function(){
            $.ajax({
              url: './ajax/deleteFewUsers.php',
              type: "POST",
              cache: false,
              data: {'checkElem':checkElem},
              success: (data) => {
                let res = JSON.parse(data);
                if (res.result == true) {
                  //перемалювати таблицю
                  paintTable();
                  //конфірм підтвердження
                  $("#parent").prop('checked', false);  
                  $('#confirm').modal('hide'); 
                  //очистити значення селекту
                  $('select').each(()=>{
                    $('select').val('');
                  });
                  $('#parent').prop('checked', false);
                }else{
                  $('body').html(res.data);
                }
              }
            });
          });
        }else if(select == true || select == false){
       //сортувати активний/неактивний 
        $.ajax({
          url: './ajax/selectPart.php',
          type: "POST",
          cache: false,
          data: {'select': select,
                  'checkElem':checkElem},
          success: (data) => {
            let res = JSON.parse(data);
            if (res.result == true) {
              //перемалювати таблицю
              paintTable();
              //очистити значення селекту
              $('select').each(()=>{
                $('select').val('');
              });
              $('#parent').prop('checked', false);
            }else{
              $('body').html(res.data);
            }  
          }
        });
      }else{ return false};
    }else{
      $('#confirm').modal('show');
      $('#cancel').addClass('fade');

      $('#delete').addClass('d-none');
      $('#agree').removeClass('d-none');
      $('#condirmTitle').text('Actions for few users');
      $('#confirmText').text('You have to select some users');
      $('#agree').click(()=>{$('#confirm').modal('hide');});
      $("#parent").prop('checked', false);

    }     
  });
});