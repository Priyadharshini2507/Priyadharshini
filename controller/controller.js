const db = require('../modules/User');
const db1 = require('../modules/admin');
const db2 = require('../modules/task')
//adding user
exports.createUsers = async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { role } = req.body;
  const { password } = req.body;
  try {
    const data = { name, email, role, password }
    let k = new db(data).save();
    res.status(200).json(req.body);
  }
  catch (error) {
    console.log("Error in adding new register", error)
  }
}
//get user
exports.getUsers = (req, res) => {
  db.find({})
    .then(docs => {
      console.log(docs)
      res.json(docs)
    })
    .catch(err => console.log("Error in fetching the users", err))
}
//adding admin
exports.createadmin = async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { role } = req.body;
  const { password } = req.body;
  try {
    const data = { name, email, role, password }
    let k = new db1(data).save();
    res.status(200).json(req.body);
  }
  catch (error) {
    console.log("Error in adding new register", error)
  }
}
// deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    console.log("found");
    let g = await db.findByIdAndDelete(userId);
    res.send("Deleted successfully");
  }
  catch (error) {
    console.log("Error in deleting the user's profile", error);
  }
}
//task adding
exports.createtask = async (req, res) => {
  const { taskname } = req.body;
  const { description } = req.body;
  const { duration } = req.body;
  const { status } = req.body;
  const { assigned } = req.body;
  const {notification}=req.body;
  const {comment}=req.body;
  const {dates1}=req.body;
  const{assigndate}=req.body;
  const{taskid}=req.body;
  try {
   const data = { taskname, description, duration, status, assigned, notification,comment,dates1,assigndate,taskid}
    let k = new db2(data).save();
    res.status(200).json(k);
  }
  catch (error) {
    console.log("Error in adding new register", error)
  }
}
//task deleting
exports.deletetask = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    console.log("found");
    let g = await db2.findByIdAndDelete(userId);
    res.send("Deleted successfully");
  }
  catch (error) {
    console.log("Error in deleting the user's profile", error);
  }
}
//get task by their unique id 
exports.gettaskbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const getid = await db2.findById(id).lean();
    res.status(200).json(getid);
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}
//get all task
exports.gettask = (req, res) => {
  db2.find({})
    .then(docs => {
      console.log(docs)
      res.json(docs)
    })
    .catch(err => console.log("Error in fetching the users", err))
}
//updating the task
exports.updatetask = async (req, res) => {
  try {
    const up = req.params.id;
    console.log("IDDDDD", up);
    console.log("REQQQQQQQQQ.BODYYYY", req.body);
    let upd = await db2.findByIdAndUpdate(up, req.body);
    res.status(200).json(upd)

  }
  catch (error) {
    res.status(404).json({ message: "error" })
    console.log(error)
  }
}
exports.getStatus =async (req, res) => {
  try {
    const id = req.params.id;
    const cas=new RegExp(`${id}`,'i');
      const getstatus = await db2.find({ status:{$regex:cas} }).lean();
      const getname = await db2.find({ taskname: {$regex:cas} }).lean();
      const getdescription = await db2.find({ description: {$regex:cas} }).lean();
      const getcomment = await db2.find({ comment: {$regex:cas} }).lean();
      const getduration = await db2.find({ duration: {$regex:cas} }).lean();
      const getassign = await db2.find({ assigned: {$regex:cas} }).lean();
      let result;
      if (getstatus.length!=0) {
          result=getstatus;
          console.log("Status",result);
      }
      else if (getname.length!=0) {
          result=getname;
          console.log("Taskname",result);
      }
      else if (getdescription.length!=0) {
          result=getdescription;
          console.log("des",result);
      }
      else if (getcomment.length!=0) {
          result=getcomment;
          console.log("priority",result);
      }
      else if (getduration.length!=0) {
          result=getduration;
          console.log("duration",result);
      }
      else if(getassign.length!=0){
          result=getassign;
      }
      console.log("Result.......",result)
      res.status(200).json(result)
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}