
document.getElementById('btnlogin').addEventListener('click', function () {
    logIn(document.getElementById('user').value, document.getElementById('password').value);
});

document.getElementById('btnregistry').addEventListener('click', function () {
    localStorage.setItem('option', 'registry');
    location.replace('user.html');
});

function getAllUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (data) {
            readJson(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}

window.addEventListener('load', function () {
    getAllUsers();
});

function readJson(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('tbody').innerHTML += `<tr>
                                    <th scope="row">`+ data[i].id + `</th>
                                    <td>`+ data[i].name + `</td>
                                    <td>`+ data[i].lastname + `</td>
                                    <td>`+ data[i].country + `</td>
                                </tr>`;
    }
}

function logIn(us, pass) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/VS%20php/WebServicePhp/api/apiws.php?user="+ us +"&password="+ pass,
        dataType: "json",
        beforeSend: function () {
            
        },
        success: function (data) {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                localStorage.setItem('option', 'login');
                localStorage.setItem('id', data[0].id);
                location.replace('user.html');
            } else {
                console.log(data['id'])
                swal("Advertencia","Credenciales Inexistentes","warning");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "\n" + textStatus + "\n" + errorThrown);
        }
    });
}