
window.addEventListener('load', function () {
    if (localStorage.getItem('option') === 'registry') {
        document.getElementById('btnsave').style.display = 'block';
        document.getElementById('btndelete').style.display = 'none';
        document.getElementById('btnupdate').style.display = 'none';
        document.getElementById('btnlogout').innerHTML = 'Cancelar';
    } else {
        document.getElementById('btnsave').style.display = 'none';
        document.getElementById('btndelete').style.display = 'block';
        document.getElementById('btnupdate').style.display = 'block';
        document.getElementById('btnlogout').innerHTML = 'Log Out';
        getUserbyId(localStorage.getItem('id'));
        console.log(localStorage.getItem('id'));
    }
});

document.getElementById('btnlogout').addEventListener('click', function () {
    localStorage.clear();
    location.replace('index.html');
});

function clear() {
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('country').value = '';
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';
}

function saveUser(jsondata) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php?name=" + jsondata.name
            + "&lastname=" + jsondata.lastname + "&country=" + jsondata.country + "&user=" + jsondata.user
            + "&password=" + jsondata.password,
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            clear();
            swal('Datos registrados');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

document.getElementById('btnsave').addEventListener('click', function () {
    var jsondata = {};
    jsondata.name = document.getElementById('name').value;
    jsondata.lastname = document.getElementById('lastname').value;
    jsondata.country = document.getElementById('country').value;
    jsondata.user = document.getElementById('user').value;
    jsondata.password = document.getElementById('password').value;
    saveUser(jsondata);
});

function getUserbyId(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php?id=" + id,
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                document.getElementById('name').value = data[0].name;
                document.getElementById('lastname').value = data[0].lastname;
                document.getElementById('country').value = data[0].country;
                document.getElementById('user').value = data[0].user;
                document.getElementById('password').value = data[0].password;
            } else {
                console.log(data['except'])
                swal('Error externo');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

function editUser(jsondata) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php?id=" + jsondata.id
            + "&name=" + jsondata.name + "&lastname=" + jsondata.lastname
            + "&country=" + jsondata.country + "&user=" + jsondata.user
            + "&password=" + jsondata.password,
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(jsondata),
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            getUserbyId(localStorage.getItem('id'));
            swal('Datos actualizados');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

document.getElementById('btnupdate').addEventListener('click', function () {
    var jsondata = {};
    jsondata.id = localStorage.getItem('id');
    jsondata.name = document.getElementById('name').value;
    jsondata.lastname = document.getElementById('lastname').value;
    jsondata.country = document.getElementById('country').value;
    jsondata.user = document.getElementById('user').value;
    jsondata.password = document.getElementById('password').value;
    editUser(jsondata);
});

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php?id=" + id,
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            localStorage.clear();
            location.replace('index.html');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

document.getElementById('btndelete').addEventListener('click', function() {
    deleteUser(localStorage.getItem('id'));
});
