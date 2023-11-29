window.onload = getTask()
let users = "";
//details of the task
function getTask() {
  const x = new XMLHttpRequest();
  x.open("GET", "http://localhost:2000/task", true);
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
let names;
// display the task details in the table format
function display() {
  let head = `<table><tr>
  <th>Task Id</th>
    <th>Assigned to</th>
    <th>Task Name</th>
    <th>Description</th>
    <th>Comment</th>
    <th style="width:400%">Status</th> 
    <th>Date</th> 
    <th>Delete task</th> 
    <th>Update Task</th>
  </tr>`;
  let pre;
  let content = " ";
  let form1 = " ";
  for (let i in users) {
    names = users[i].username;
    content += `
    <tr>
    <td>${users[i].taskid}</td>
    <td>${users[i].assigned}</td>
    <td>${users[i].taskname}</td>
    <td>${users[i].description}</td>
    <td>${users[i].comment}</td>
    <td><label id="s${i}">${users[i].status}</label></td>
    <td>${users[i].assigndate}</td>
    <td><button class="open-button" onclick='del("${users[i]._id}")'><img src="https://th.bing.com/th/id/R.ce86e109c7cc85aca07724c214576702?rik=BXXw5zYPFQO0Ug&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fy%2f4%2fF%2fb%2fG%2fq%2fdelete-button-png-hi.png&ehk=7o8vEHUH0oMlzds0nUhcdZUBHLe96S1kWATbS0ggktE%3d&risl=&pid=ImgRaw&r=0" height="50px" width="50px"></button></td>
    <td><button class="open-button" onclick='openForm("${users[i]._id}")'><img src ="https://th.bing.com/th/id/R.40e8f05b80c110e2d1db2c6519a9af70?rik=tgE3MTRl11p2Iw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2f4%2fD%2fx%2fS%2ff%2fz%2fedit-button-png.svg.hi.png&ehk=Zn%2b8G8WQbJwoio4jW%2biBNdSE5%2fbAIoAR9u4k35eNfUM%3d&risl=&pid=ImgRaw&r=0" width="70px" height="50px"></button></td>
  </tr>   `
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
/**  deleting the task by using taskid
* @param x represent unique task id
*/
function del(x) {
  console.log(x)
  if (confirm("Do you want to delete")) {
    let y = new XMLHttpRequest();
    y.open("DELETE", `http://localhost:2000/task/${x}`, true);
    y.send();
    y.onreadystatechange = function () {
      if (y.readyState == 4) {
        if (y.status == 200) {
          getTask();
        }
      }
    }
  }
  else {
    alert("Task is not deleted");
  }
}
// closing the form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function openForm(u) {
  document.getElementById("myForm").style.display = "block";
  let c;
  const x = new XMLHttpRequest();
  x.open("GET", "http://localhost:2000/task/" + u, true);
  x.setRequestHeader("Content-Type", "application/json");
  x.send();
  x.onreadystatechange = function () {
    if (x.readyState == 4) {
      console.log("asbjdhgbj")
      if (x.status == 200) {
        let result = JSON.parse(x.response);
        document.getElementById("tname1").value = result.taskname;
        document.getElementById("description1").value = result.description;
        document.getElementById("duration1").value = result.duration;
        document.getElementById("status1").value = result.status;

      }
    }
  }
  form1 = `
  <button type="button" onclick="updateTask('${u}')" id="submit">Update </button>`
  document.getElementById('updateid').innerHTML = form1
}
/** updating taskname,description,duration and status 
@param u represent unique task id 
*/
function updateTask(u) {
  let data1 = document.getElementById("tname1").value;
  let data2 = document.getElementById("description1").value;
  let data3 = document.getElementById("duration1").value;
  let data4 = document.getElementById("status1").value;
  let req2 = new XMLHttpRequest(); 
  req2.open("PUT", `http://localhost:2000/task/${u}`, true);
  req2.setRequestHeader("Content-type", "application/json");
  req2.send(JSON.stringify({
    "taskname": data1,
    "description": data2,
    "duration": data3,
    "status": data4
  }));
  req2.onreadystatechange = function () {
    if (req2.readyState == 4) {
      if (req2.status == 200) {
        console.log("UPDATE SUCCESSFUL");
        console.log(req2.responseText);
        alert("Updated successfully");
        window.location.reload();
      }
    }
  }
  document.getElementById("task").reset()
  document.getElementById("myForm").style.display = "block";
}
let result = " ";
//filtering the given input
function searchForm() {
  let search_Value = document.getElementById("searching").value;
  const a = new XMLHttpRequest();
  const url = "http://localhost:2000/taskFind/" + search_Value
  a.open("GET", url, true);
  a.setRequestHeader("Content-Type", "application/json");
  a.send();
  a.onreadystatechange = function () {
    if (a.readyState == 4) {
      if (a.status == 200) {
        result = JSON.parse(a.response);
        searchBar(result)
      }
    }
  }
}
/** display the filtered details
@param result represent taskname,status,duration,descritption
*/
function searchBar(result) {
  document.getElementById("customers").style.display = "none"
  console.log(result);
  let head1 = `<table><tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Status</th>
	 <th>Comment</th>
	 <th>Assigned to</th>
  </tr>`;
  let content1 = " ";
  for (let i in result) {
    content1 += `
    <tr>
  <td>${result[i].taskname}</td>
  <td> ${result[i].description}</td>
	<td><label id="s1${i}">${result[i].status}</label></td>
	<td>${result[i].comment}</td>
	<td>${result[i].assigned}</td>  
  </tr>  `
  }
  document.getElementById('search').innerHTML = head1 + content1 + "</table>";
  console.log(content1);
}