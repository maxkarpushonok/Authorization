function getXmlHttp(){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function checkInput(string) {
    return string.match(/^[A-z0-9]+$/);
}

function checkEmail(string) {
    return string.match(/^([0-9A-z]{1,}[-._]{0,1}){1,4}@([0-9A-z]{1,}[-]{0,1}[0-9A-z]{1,}\.){1,2}[A-z]{2,}$/);
}

function signin() {
    let req = getXmlHttp();
    let login = escapeHtml(document.getElementById('signinLogin').value);
    let password = escapeHtml(document.getElementById('signinPassword').value);

    if (login == '') {
        document.getElementById('signinResult').innerHTML = '<span style="color: #990000">Login is empty!</span>';
        return;
    }

    if (checkInput(login) == null) {
        document.getElementById('signinResult').innerHTML = '<span style="color: #990000">Login is incorrect!</span>';
        return;
    }

    if (password == '') {
        document.getElementById('signinResult').innerHTML = '<span style="color: #990000">Password is empty!</span>';
        return;
    }

    if (checkInput(password) == null) {
        document.getElementById('signinResult').innerHTML = '<span style="color: #990000">Password is incorrect!</span>';
        return;
    }

    const url = 'ajax.php';
    const params = 'signin=true&login=' + login + '&password=' + password;

    req.responseType = 'json';
    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.addEventListener('readystatechange', () => {
        if(req.readyState === 4 && req.status === 200) {
            var result = req.response;
            if (result == null) {
                var signinResult = document.getElementById('signinResult');
                signinResult.innerHTML = '<span style="color: #990000">Incorrect login or password!</span>';
            } else {
                document.getElementById('signin').style.display = 'none';
                document.getElementById('signout').style.display = 'block';
                var signoutResult = document.getElementById('signoutResult');
                signoutResult.innerHTML = 'Hello ' + result.name + '!';
            }
        }
    });

    req.send(params);
}

function showRegistrationForm() {
    let signIn = document.getElementById('signin');
    signIn.style.display = 'none';
    let registration = document.getElementById('registration');
    registration.style.display = 'block';
}

function registration() {
    let req = getXmlHttp();
    let login = document.getElementById('registrationLogin').value;
    let password = document.getElementById('registrationPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let email = document.getElementById('registrationEmail').value;
    let name = document.getElementById('registrationName').value;

    if (login == '') {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Login is empty!</span>';
        return;
    }

    if (checkInput(login) == null) {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Login is incorrect!</span>';
        return;
    }

    if (password == '') {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Password is empty!</span>';
        return;
    }

    if (checkInput(password) == null) {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Password is incorrect!</span>';
        return;
    }

    if (confirmPassword == '') {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Confirm password is empty!</span>';
        return;
    }

    if (password != confirmPassword) {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Passwords do not match!</span>';
        return;
    }

    if (email == '') {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">E-mail is empty!</span>';
        return;
    }

    if (checkEmail(email) == null) {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">E-mail is incorrect!</span>';
        return;
    }

    if (name == '') {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Name is empty!</span>';
        return;
    }

    if (checkInput(name) == null) {
        document.getElementById('registrationResult').innerHTML = '<span style="color: #990000">Name is incorrect!</span>';
        return;
    }

    const url = 'ajax.php';
    const params = 'registration=true&login=' + escapeHtml(login)
        + '&password=' + escapeHtml(password)
        + '&email=' + escapeHtml(email)
        + '&name=' + escapeHtml(name);

    req.responseType = 'json';
    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.addEventListener('readystatechange', () => {
        if(req.readyState === 4 && req.status === 200) {
            let result = req.response;
            let registrationResult = document.getElementById('registrationResult');
            registrationResult.innerHTML = result.status;
        }
    });

    req.send(params);
}

function signout() {

}