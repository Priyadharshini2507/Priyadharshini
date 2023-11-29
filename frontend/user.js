//details of the registered user
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
        console.log(users);
        display();
      }
    }
  }
}
//display the details in the table format
function display() {
  let head = `<table><tr>
    <th> <img src="https://i.pinimg.com/originals/82/0e/aa/820eaa2abdd4c03c9d656947e1336bcc.png" width="30px" height="30px"> Name</th>
    <th>Email <button type="button" onclick=sortTable() id="sub" ><i class="fa fa-sort" aria-hidden="true"></i></button></th>  
    </tr>`;
  let content = " ";
  for (let i in users) {
    names = users[i].username;
    content += `
    <tr>
    <td>${users[i].username}</td>
    <td> ${users[i].email}</td>
  </tr>  `
  }
  document.getElementById('customers').innerHTML = head + content + "</table>";
}
//sorting table using alphabets
function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("customers");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}