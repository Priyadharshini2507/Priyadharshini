//adding a new user
function addUser()
{
    let Name = document.getElementById("name").value;
    let Email=document.getElementById("email").value;
    let Password=document.getElementById("password").value;
	let Phone="user";
	let y = new XMLHttpRequest();
	y.open("POST", "http://localhost:2000/register", true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
        JSON.stringify({
		"username": Name,
        "email":Email,
        "password":Password,
		"role":Phone
	}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
				location.replace('http://localhost:2000/loginpage.html');	
			}
		}
	}
    alert("Registration successful..");
	document.getElementById("formdata").reset();	
}