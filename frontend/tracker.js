//getting the details of registered user
window.onload = getRegister()
let users = "";
function getRegister() {
	const x = new XMLHttpRequest();
	x.open("GET", "http://localhost:2000/register", true);
	x.send();
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			if (x.status == 200) {
				users = JSON.parse(x.responseText);
				display();
			}
		}
	}
}
//details of the registered user
function display() {
	let head = `<tr>
    <th>Name</th>
    <th>Email</th>
	<th>Assign a task</th>
  </tr>`;
	let content = " ";
	for (let i in users) {
		content += `
    <tr>
    <td >${users[i].username}</td>
    <td>${users[i].email}</td>
	<td><button class="open-button" onclick='openForm("${users[i].username}")'><img src="https://jammydigital.com/wp-content/uploads/2017/04/website-questionnaire.jpg" width="40px heigth="40px></button></td>
  </tr>`
	}
	document.getElementById('customers').innerHTML = head + content + "</table>";
	console.log(content);
}
function closeForm() 
{
	document.getElementById("myForm").style.display = "none";
}
let taskassigned;
/**openform for assigning a new task o a user
 * @param u represent username 
 */
function openForm(u) {
	document.getElementById("myForm").style.display = "block";
	taskassigned = u;
	let task1 = " ";
	task1 += ` <form action="#">
		  <label for="cars" id="lists">Choose a Task:</label>
		  <select name="task" id="menu">`
	for (let j in users1) {
		if (users1[j].assigned == "") {
			task1 += `
			<option value="${users1[j].taskname}">${users1[j].taskname}</option>`
		}
	}
	task1 += `</select>
		 <button type="button" onclick="updateTask()" id="submit">Assign</button>
		 <button type="button" onclick="closeForm()" id="submit1" >Close</button>
	   </form>`;
	document.getElementById("myForm").innerHTML = task1;
	event.preventDefault();
	console.log(task1);
}
window.onload = getTask
let users1 = "";
// getting  details of the task
function getTask() {
	const xy = new XMLHttpRequest();
	xy.open("GET", "http://localhost:2000/task", true);
	xy.send();
	xy.onreadystatechange = function () {
		if (xy.readyState == 4) {
			if (xy.status == 200) {
				users1 = JSON.parse(xy.responseText);
				console.log(users1);
			}
		}
	}
}
//updating the task to a user and date
function updateTask() {
	window.location.reload();
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	today = dd + '/' + mm + '/' + yyyy;
	let u = document.getElementById("menu").value;
	let num = 1
	console.log(u);
	for (let i in users1) {
		if (u == users1[i].taskname) {
			g = users1[i]._id;
		}
	}
	let data1 = taskassigned;
	let req2 = new XMLHttpRequest();
	req2.open("PUT", `http://localhost:2000/task/${g}`, true);
	req2.setRequestHeader("Content-type", "application/json");
	req2.send(JSON.stringify({
		"assigned": data1,
		"notification": num,
		"assigndate": today,
	}));
	req2.onreadystatechange = function () {
		if (req2.readyState == 4) {
			if (req2.status == 200) {
				console.log("UPDATE SUCCESSFUL");
				console.log(req2.responseText);
				alert("Task Assigned successfully")
			}
		}
	}
	document.getElementById("myForm").style.display = "none";
}
// closing the form 
function closeForm() {
	document.getElementById("myForm").style.display = "none";
}