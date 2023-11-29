// details of all task asigned for a user
window.onload = getTask()
let users = "";
function getTask() {
  const x = new XMLHttpRequest();
  x.open("GET", "http://localhost:2000/task", true);
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
let names;
//display the details of created task
function display() {
  let head = `<table><tr>
    <th>Assigned to</th>
    <th>Task Name</th>
    <th>Description</th>
    <th>Duration</th>
    <th>Status</th>  
    <th>Comments</th>
  </tr>`;
  let content = " ";
  for (let i in users) {
    names = users[i].username;
    content += `
    <tr>
    <td>${users[i].assigned}</td>
    <td>${users[i].taskname}</td>
    <td>${users[i].description}</td>
    <td>${users[i].duration}</td>
    <td><label id="s${i}">${users[i].status}</label></td>
    <td>${users[i].comment}</td>
  </tr>`
  }
  document.getElementById('customers').innerHTML = head + content + "</table>";
  for (let j = 0; j < users.length; j++) {
    if (document.getElementById(`s${j}`).innerHTML == 'Pending') {
      document.getElementById(`s${j}`).style.color = "yellow";
    }
    if (document.getElementById(`s${j}`).innerHTML == 'Not started') {
      document.getElementById(`s${j}`).style.color = "red";
    }
    if (document.getElementById(`s${j}`).innerHTML == 'Completed') {
      document.getElementById(`s${j}`).style.color = "green";
    }
    if (document.getElementById(`s${j}`).innerHTML == 'In-progress') {
      document.getElementById(`s${j}`).style.color = "grey";
    }
  }
}