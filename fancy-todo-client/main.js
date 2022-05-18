let idTemp = ""
let url = 'https://fancy-todo-loshaless.herokuapp.com/'

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST", url: `${url}googleLogin`, data: {
      id_token
    }
  })
    .done(response => {
      localStorage.setItem('token', response.token);
      showHome()
    })
    .fail(err => {
      console.log(err);
    })
}

function showLogin() {
  $('#register, #allList, #navLogout, #navRead,#navLogin, #add,#edit').hide()
  $('#login,  #navRegister').show()
}

function showRegister() {
  $('#login, #allList, #navLogout, #navRead, #navRegister,#add, #edit').hide()
  $('#register, #navLogin').show()
}

function showHome() {
  $('#login, #register, #navLogin, #navRegister,#add, #edit').hide()
  $('#navLogout, #navRead').show()
  fetchTodo()
}

function showAdd() {
  $('#login, #register, #navLogin, #navRegister, #allList').hide()
  $('#navLogout, #add, #navRead').show()
}

function showEdit() {
  $('#login, #register,#add, #navLogin, #navRegister, #allList').hide()
  $('#navLogout, #edit,#navRead').show()
}

function delet(event, id) {
  event.preventDefault()
  $.ajax({
    method: "DELETE", url: `${url}todos/${id}`, headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function () {
      showHome()
    })
    .fail(err => {
      console.log(err);
    })
}

function edit(id, title, description, status, due_date) {
  idTemp = id
  $('#idEdit').text(`Edit Form Id ${id}`)
  $('#edit-title').val(title)
  $('#edit-description').val(description)
  $(`#${status}`).prop("checked", true);
  $('#edit-due_date').val(due_date.toString().split("T")[0])
  showEdit()
}

function update(event) {
  event.preventDefault()
  let title = $('#edit-title').val()
  let description = $('#edit-description').val()
  let status = $('input[name="editStatus"]:checked').val()
  let due_date = $('#edit-due_date').val()
  $.ajax({
    method: "PUT", url: `${url}todos/${idTemp}`, data: {title, description, status, due_date}, headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function () {
      $('#edit-title').val('')
      $('#edit-description').val('')
      $('#edit-status').val('')
      $('#edit-due_date').val('')
      showHome()
    })
    .fail(err => {
      Swal.fire(err.responseJSON.message)
    })
}

function changeStatus(event, id, status) {
  event.preventDefault()
  let statusById
  if (status === "Progress") {
    statusById = "Done"
  } else {
    statusById = "Progress"
  }
  $.ajax({
    method: "PATCH", url: `${url}todos/${id}`, data: {
      status: statusById
    }, headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(() => {
      showHome()
    })
    .fail((err) => {
      console.log(err);
    })
}

function fetchTodo() {
  $('#todo').empty()
  $.ajax({
    method: 'GET', url: `${url}todos`, headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      response.forEach(e => {
        let {id, title, description, status, due_date} = e
        $('#todo').append(`
                <tr>
                    <td> ${id}</td>
                    <td> ${title}</td>
                    <td> ${description}</td>
                    <td> ${status}</td>
                    <td> ${due_date.toString().split("T")[0]}</td>
                    <td>
                        <a onclick="edit(${id}, '${title}', '${description}','${status}','${due_date}')" class="btn btn-info">Edit</a> 
                        <a onclick="changeStatus(event, ${id},'${status}' )" class="btn btn-warning">Change Status</a>
                        <a onclick="delet(event, ${id})" class="btn btn-danger">Delete</a> 
                    </td>       
                <tr/>
                `)
      });
      $('#allList').show()
    })
    .fail(err => {
      console.log(err);
    })
}


$(document).ready(function () {
  if (localStorage.getItem('token')) {
    showHome()
  } else {
    showLogin()
  }
  $("#login").submit(function (event) {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
      method: 'POST', url: `${url}signIn`, data: {
        email, password
      }
    })
      .done((response) => {
        // console.log(response)
        $('#email-login').val('')
        $('#password-login').val('')
        localStorage.setItem('token', response.token);
        showHome()
      })
      .fail(err => {
        swal.fire(err.responseJSON.message)
      })
  })
  $("#navRead").click(function (event) {
    event.preventDefault()
    showHome()
  });

  $("#navRegister").click(function (event) {
    event.preventDefault()
    showRegister()
  });

  $("#register").submit(function (event) {
    event.preventDefault()
    let email = $('#email-register').val();
    let password = $('#password-register').val();
    $.ajax({
      method: "POST", url: `${url}signUp`, data: {email, password}
    })
      .done(() => {
        $('#email-register').val('')
        $('#password-register').val('')
        showLogin()
      })
      .fail(err => {
        swal.fire(err.responseJSON.message)
      })
  });

  $('#navLogin').click(function (event) {
    event.preventDefault()
    showLogin()
  })

  $("#addButton").click(function (event) {
    event.preventDefault()
    showAdd()
  });

  $("#navAdd").click(function (event) {
    event.preventDefault();
    showAdd()
  });

  $("#add").submit(function (event) {
    event.preventDefault()
    let title = $('#add-title').val()
    let description = $('#add-description').val()
    let status = $('input[name="addStatus"]:checked').val()
    let due_date = $('#add-due_date').val()
    $.ajax({
      method: "POST", url: `${url}todos/`, data: {title, description, status, due_date}, headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(function () {
        $('#add-title').val('')
        $('#add-description').val('')
        $('#add-status').val('')
        $('#add-due_date').val('')
        showHome()
      })
      .fail(err => {
        Swal.fire(err.responseJSON.message)
        console.log(err.responseJSON.message);
      })
  });

  $('#navLogout').click(function (event) {
    event.preventDefault();
    localStorage.removeItem('token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    showLogin()
  })

  $("#searchById").keyup(function () {
    let foundId = $('#searchById').val()
    if (foundId) {
      $.ajax({
        method: 'GET', url: `${url}todos/${foundId}`, headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(response => {
          $('#todo').empty()
          let {id, title, description, status, due_date} = response
          $('#todo').append(`
                    <tr>
                        <td> ${id}</td> 
                        <td> ${title}</td>
                        <td> ${description}</td>
                        <td> ${status}</td>
                        <td> ${due_date.toString().split("T")[0]}</td>
                        <td>
                            <a onclick="edit(${id}, '${title}', '${description}','${status}','${due_date}')" class="btn btn-info">Edit</a> 
                            <a onclick="changeStatus(event, ${id})" class="btn btn-warning">Change Status</a>
                            <a onclick="delet(event, ${id})" class="btn btn-danger">Delete</a> 
                        </td>    
                    <tr/>
                    `)
        })
        .fail(() => {
          $('#todo').empty()
        })
    } else {
      showHome()
    }
  });
})
