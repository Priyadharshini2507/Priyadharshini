window.onload = getTask;
let users = "";
let names;
let but;
// detail of the user who logged in 
function getTask() {
  names = localStorage.getItem("Name");
  console.log(names);
  document.getElementById("demo").innerHTML = "Welcome" + " " + names;
  but = `  <input type="text" placeholder=" Search task" name="search" id="searching">
<button type="button" onclick="searchForm()" id="sub" > <i class="fa fa-search" style="font-size: 40px;">
</i></button>`
  document.getElementById("search").innerHTML = but;
  const x = new XMLHttpRequest();
  x.open("GET", "http://localhost:2000/task", true);
  x.send();
  x.onreadystatechange = function () {
    if (x.readyState == 4) {
      if (x.status == 200) {
        users = JSON.parse(x.responseText);
        console.log(users);
        console.log(but)
// creating alert for assigning a new task to a user
function alerting() {
   for (let s in users) {
         if (users[s].notification == 1) {
              alert("Admin Assigned you a new task");
              let xhr3 = new XMLHttpRequest();
              xhr3.open("PUT", "http://localhost:2000/task/" + users[s]._id, true);
              xhr3.setRequestHeader("content-type", "application/json");
              xhr3.send(JSON.stringify({ notification: 0 }));
              xhr3.onreadystatechange = function () {
                if (xhr3.readyState == 4) {
                  if (xhr3.status == 200) {
                  }
                }
              }
            }
          }
        }
        setTimeout(alerting, 1000);
        display();
      }
    }
  }
}
// display the details of the task
function display() {
  let task1 = " ";
  console.log(names)
  console.log(users)
  let count = 0;
  for (let i in users) {
    if (users[i].assigned == names) {
      count++;
      console.log(count)
      if (count == 0) {
      }
      else {
        task1 += `
            <div class="column">
            <div class="card">
            <h1> Task:${users[i].taskname}</h1><br>
            <h1>Description:${users[i].description}</h1><br>
            <h1>Duration:${users[i].duration}</h1> <br>
            <h1>Status:${users[i].status}</h1><br>
            <h1>Date:${users[i].dates1}</h1><br>
            <button type="submit" onclick="opening('${users[i]._id}')" id="submit">Update Status/Comment</button>
          </form></div></div> `
      }
    }
  }
  document.getElementById("rows").innerHTML = task1;
  document.getElementById("rows").style.display = "block"
  document.getElementById("myForm").style.display = "none";
}
let u1 = " ";
let box = " ";
// adding comments and updating status
function opening(taskid) {
  box = `<textarea id=fname></textarea><br><button onclick="updateComment('${taskid}')" id="submit">ADD</button>
 <form action="#">
    <label for="cars" id="lists">Choose a Task:</label>
    <select name="task" id="menu">
    <option id="green" value="Completed">Completed</option>
    <option id="grey" value="Pending">Pending</option>
    <option id="yellow" value="In-progress">In-progress</option>
    <option id="red" value="Not started">Not started</option>
    </select>
    <br>
    <br>
   <button type="button" onclick="updateStatus('${taskid}')" id="submit">Update</button>
   <button type="button" onclick="closeForming()" id="submit" >Close</button>
   </form>`;
  document.getElementById("myForm").innerHTML = box;
  document.getElementById("myForm").style.display = "block"
}
//closing the comment and status updating form
function closeForming() {
  document.getElementById("myForm").style.display = "none";
}
function close() {
  document.getElementById("comm").style.display = "none";
}
//updating comments provided by the user
function updateComment(u1) {
  let com = document.getElementById("fname").value;
  let req2 = new XMLHttpRequest();
  req2.open("PUT", `http://localhost:2000/task/${u1}`, true);
  req2.setRequestHeader("Content-type", "application/json");
  req2.send(JSON.stringify({
    "comment": com,
  }));
  req2.onreadystatechange = function () {
    if (req2.readyState == 4) {
      if (req2.status == 200) {
        console.log("UPDATE SUCCESSFUL");
        console.log(req2.responseText);
        alert("Comment Added");
        window.location.reload();
      }
    }
  }
}
/**updating the status by the user
@param u1 represesnt unique task id
*/
function updateStatus(u1) {
  console.log(u1)
  let updata = document.getElementById("menu").value;
  console.log("datsa", updata);
  let req2 = new XMLHttpRequest();
  req2.open("PUT", `http://localhost:2000/task/${u1}`, true);
  req2.setRequestHeader("Content-type", "application/json");
  req2.send(JSON.stringify({
    "status": updata,
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
}
// search which task are completed ,pending,in-progress and not started 
function searchForm() {
  let g = document.getElementById("searching").value;
  const a = new XMLHttpRequest();
  const url = "http://localhost:2000/taskFind/" + g
  a.open("GET", url, true);
  a.setRequestHeader("Content-Type", "application/json");
  a.send();
  a.onreadystatechange = function () {
    if (a.readyState == 4) {
      console.log("asbjdhgbj")
      if (a.status == 200) {
        let task1 = "";
        let result = JSON.parse(a.responseText);
        console.log("Hiiiiiiiiiiiiii", result);
        for (let i in result) {
          if (result[i].assigned == names) {
          task1 += `
          <div class="column">
          <div class="card">
          <h1> Task:${result[i].taskname}</h1><br>
          <h1>Description:${result[i].description}</h1><br>
          <h1>Duration:${result[i].duration}</h1> <br>
          <h1>Date:${result[i].assigndate}</h1><br>
          <h1>Status:${result[i].status}</h1><br>
          </div></div>
          `
          }
        }
        document.getElementById("rows").innerHTML = task1;
      }
    }
  }
document.getElementById("rows").style.display = "block";
}