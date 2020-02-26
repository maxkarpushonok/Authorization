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

function signin() {
    let req = getXmlHttp();
    let login = document.getElementById('signinLogin').value;
    let password = document.getElementById('signinPassword').value;

    //TODO checked data

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
    let email = document.getElementById('registrationEmail').value;
    let name = document.getElementById('registrationName').value;


    //TODO checked data

    const url = 'ajax.php';
    const params = 'registration=true&login=' + login + '&password=' + password + '&email=' + email + '&name=' + name;

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