
<div class="container p-4" id="modal-box">
 <h3 class="text-center mb-3">Modal form</h3>
  <form action="./js/script.js" method="post">
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">First Name</label>
      <div class="col-sm-10">
        <input type="hidden" name="id" value="" id="idUser">
        <input type="text" class="form-control mb-2" id="name" name="name" placeholder="Enter your First Name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Last Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control mb-2" id="lastName" name="lastName" placeholder="Enter your Last Name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Your Role</label>
        <div class="col-sm-10">
          <select name="admin" id="admin" class="form-select" aria-label="Default select example">
            <option selected disabled>Choice your role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
    </div>
    <div class="form-group row mt-3">
      <div class="col-sm-2">Status</div>
      <div class="col-sm-10">
        <div class="form-check form-switch">
          <input name="active" class="form-check-input" type="checkbox" id="active">
          <label class="form-check-label" for="active">Active person</label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-10">
        <div class="alert alert-danger mt-2" id="errorBlock"></div>
        <button type="button" class="btn btn-primary mt-3" id="submit">Add Person</button>
        <button type="button" class="btn btn-primary mt-3 hide" id="update">Update Info</button>
      </div>
    </div>
  </form>
</div>


