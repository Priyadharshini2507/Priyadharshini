//validation user details by username and password
function validation() {
    let j = document.getElementById("name1").value;
    localStorage.setItem("Name", j);
    let k = document.getElementById("password1").value;
    let y = new XMLHttpRequest();
    y.open("POST", "http://localhost:2000/login", true);
    y.setRequestHeader("Content-Type", "application/json");
    y.send(
        JSON.stringify({
            "username": j,
            "password": k
        }))
    y.onreadystatechange = function () {
        if (y.readyState == 4) {
            if (y.status == 200) {
                let p = JSON.parse(y.responseText);
                localStorage.setItem("Token", p.token);
                alert("Successfully signed in");
                loadUser()
            }
            else {
                alert("Invalid credentials !!!!")
            }
        }
    }
}
//getting jwt token stored in local storage
function loadUser() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2000/auth-user", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-user-auth-token", localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200)
                location.replace('http://localhost:2000/index.html');
        }
    }
}