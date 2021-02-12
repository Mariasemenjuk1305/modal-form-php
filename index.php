<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <title>Task_3 Modal Form</title>
</head>

<body>
      <div class="container mt-3">
         <div class="d-flex justify-content-center">
            <button id="add" type="button" class="btn btn-primary btn-lg col-2 m-1 p-1" data-toggle="modal"
            data-target=".bd-example-modal-lg">Add</button>
            <select id="select" class="btn-lg col-2 m-1 pt-1 pb-2" required>
                <option selected disabled value="">Please select</option>
                <option value="active">Set active</option>
                <option value="notActive">Set not active</option>
                <option value="delete">Delete</option>
              </select>
            <button id="ok" type="button" class="btn btn-secondary btn-lg col-2 m-1 p-1" data-toggle="modal">Ok</button>
          </div>
          <!-- модальне вікно -->
          <div id="myModal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
              aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <?php require 'blocks/modal.php'?>
                  </div>
              </div>
          </div>
        <!-- таблиця з даними -->
        <table class="table text-center mt-4">
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
            <?= require 'blocks/table.php' ?>
          </tbody>
        </table>
    </div>
   

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>
