const Express = require("express")
const Mongoose =require("mongoose")
const BodyParser = require("body-parser")
const Cors = require("cors")

const EmplModel = require("./models/employee")

const path = require("path")
const TaskModel = require("./models/task")

const app= new Express()

app.use(Express.static(path.join(__dirname, "./build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))
app.use(Cors())
Mongoose.connect("mongodb+srv://aatish:aatish@cluster0.euclaxo.mongodb.net/cruddb?retryWrites=true&w=majority", {useNewUrlParser: true})

app.post("/addemplapi",async(req,res)=>{
    console.log(req.body)
    const newEmpl = new EmplModel({eid :req.body.eid,
    ename :req.body.ename,
    edept :req.body.edept,
    eemail :req.body.eemail,
    edesc:req.body.edesc})
  await newEmpl.save(
    (error,data)=>{
        if(error){
            res.json({"Status":"Error","Error":error})
        }
        else{
            res.json({"Status":"Success","Data":data})
        }
    })
  })
  
  app.post("/viewempapi",async(req,res)=>{
    try{
        var result=await EmplModel.find();
        res.send(result);

    }catch(error){
        res.status(500).send(error);
    }
})

app.post("/updateapi", async(req, res) => {
  // use req.params.id to fetch employee data from a database
  // send the employee data as a JSON response
try {
  var result= await EmplModel.findOne({"_id":req.body._id});
  res.send(result);
} catch(error){
  res.status(500).send(error);
  }
})

app.post("/makeupdateapi", async (req, res) => {
  console.log(req.body);
  try {
    const updatedEmp = await EmplModel.updateOne(
      { _id: req.body._id },
      { $set: { eid: req.body.eid, ename: req.body.ename,edept: req.body.edept, eemail: req.body.eemail,edesc:req.body.edesc } }
    );
    console.log(updatedEmp);
    res.json({ Status: "Success", Data: updatedEmp });
  } catch (error) {
    console.log(error);
    res.json({ Status: "Error", Error: error });
  }
});

app.delete("/deleteapi/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEmp = await EmplModel.findByIdAndDelete(id);

    if (!deletedEmp) {
      return res.status(404).json({ Status: "Error", Error: "Employee not found" });
    }

    res.json({ Status: "Success", Data: deletedEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: "Error", Error: error.message });
  }
});




app.post("/addtaskapi",async(req,res)=>{
  console.log(req.body)
  const newTask = new TaskModel({tid :req.body.tid,
  tname :req.body.tname,
  tdept :req.body.tdept,
  tdesc:req.body.tdesc})
await newTask.save(
  (error,data)=>{
      if(error){
          res.json({"Status":"Error","Error":error})
      }
      else{
          res.json({"Status":"Success","Data":data})
      }
  })
})

app.post("/viewtaskapi",async(req,res)=>{
  try{
      var result=await TaskModel.find();
      res.send(result);

  }catch(error){
      res.status(500).send(error);
  }
})



app.delete("/deletetaskapi/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ Status: "Error", Error: "Employee not found" });
    }

    res.json({ Status: "Success", Data: deletedEmp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: "Error", Error: error.message });
  }
});


app.post("/updatetaskapi", async(req, res) => {
  // use req.params.id to fetch employee data from a database
  // send the employee data as a JSON response
try {
  var result= await TaskModel.findOne({"_id":req.body._id});
  res.send(result);
} catch(error){
  res.status(500).send(error);
  }
})

app.post("/makeupdatetaskapi", async (req, res) => {
  console.log(req.body);
  try {
    const updatedTask = await TaskModel.updateOne(
      { _id: req.body._id },
      { $set: { tid: req.body.tid, tname: req.body.tname,tdept: req.body.tdept, tdesc:req.body.tdesc } }
    );
    console.log(updatedTask);
    res.json({ Status: "Success", Data: updatedTask });
  } catch (error) {
    console.log(error);
    res.json({ Status: "Error", Error: error });
  }
});

app.listen(3011,()=>{
    console.log("server Started")
})