// adding a new task in the data base
function addTask()
{     
    let tName = document.getElementById("tname").value;
    let description=document.getElementById("description").value;
    let duration =document.getElementById("duration").value;
    let status=document.getElementById("status").value;
	let num=0;
	// getting today date
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
	let id=Math.floor(100000 + Math.random() * 900000);
	let y = new XMLHttpRequest();
	y.open("POST", "http://localhost:2000/task", true);
	y.setRequestHeader("Content-Type", "application/json");
	y.send(
        JSON.stringify({
		"taskname": tName,
        "description":description,
        "duration":duration,
		"status":status,
		"assigned":"",
		"notification":num,
		"comment":"",
		"dates1":today,
		"assigndate":"",
		"taskid":id
	}))
	y.onreadystatechange = function () {
		if (y.readyState == 4) {
			if (y.status == 200) {
			}
		}
	}
    alert("Tasked added successful..");
	document.getElementById("task").reset();	
}