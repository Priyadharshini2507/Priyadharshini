//validation admin name and password by jwt
function validationAdmin() {
    let adminName = document.getElementById("name").value;
    let adminPassword = document.getElementById("password").value;
    let y = new XMLHttpRequest();
    y.open("POST", "http://localhost:2000/adminlogin", true);
    y.setRequestHeader("Content-Type", "application/json");
    y.send(
        JSON.stringify({
            "username": adminName,
            "password": adminPassword
        }))
    y.onreadystatechange = function () {
        if (y.readyState == 4) {
            if (y.status == 200) {

                let p = JSON.parse(y.responseText);
                localStorage.setItem("Token", p.token);
                alert("Successfully signed in");
                loadUserData()
            }
            else
                alert("Invalid Credentials !!!!")
        }
    }
}
//getting Jwt token from local storage 
function loadUserData() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2000/auth-admin", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-admin-auth-token", localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200)
                location.replace('http://localhost:2000/user.html');
        }
    }
}