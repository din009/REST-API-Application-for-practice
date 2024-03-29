const { getEmployees,createEmployees } = require("./db/employees");

const express = require("express");

// const dummyData = require("./user.json");
// const fs = require("fs");
// const bodyParser = require('body-parser');

const router = express.Router();

// router.use(bodyParser.json);
router.get("/", async (req, res) => {
  const employees = await getEmployees();
  if(!employees){
    res.status = 500;
    res.json({message:"Connection error"})
  }else{
    res.status = 200;
  }
  res.json(employees);
});
router.post("/", async(req, res) => {
  const createEmp = await createEmployees(req.body)
  res.json(createEmp);
});


router.get("/:user_id", async(req, res) => {
  const user_id = req.params.user_id;
  const employees = await getEmployees(user_id);
  if(!employees){
    res.status = 402;
    res.json({message:"No Data Found"})
  } else{
    res.status = 200;
  }
  res.json(employees);
  // if (dummyData.length <= user_id) return res.json({ message: "User not found" });
  // res.json(dummyData[user_id]);
});

router.post("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  console.log(dummyData.length);
  console.log(user_id);
  console.log(JSON.stringify(req.body));
  const reqBody = req.body;
  // if(dummyData.length > user_id){ 
  new Promise(function (resolve, reject){
    dummyData[user_id]=reqBody;
    console.log(JSON.stringify(dummyData));
    let writer =fs.createWriteStream("./user.json",{overwrite:true}).on('error',error => {
      if(error) throw error;
  })
  writer.write(JSON.stringify(dummyData,null,2));
  resolve(dummyData);
    res.json(dummyData[user_id]);
  },1000);
// } return res.json({message:"User Already available"});

})

router.put("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  if(dummyData.length<=user_id){
    const reqBody = req.body;
      dummyData[user_id]=reqBody;
      console.log(JSON.stringify(dummyData));
      res.json(dummyData[user_id]);
  }else{
    const reqBody = req.body;
    Object.entries(reqBody).forEach(async([key,value])=>{
      if(key == "name"){
        dummyData[user_id].name=value;
      }else if(key == "age"){
        dummyData[user_id].age=value;
      }else if(key == "description"){
        dummyData[user_id].description=value;
      }        
    });
  }
  new Promise(function (resolve, reject){
    let writer =fs.createWriteStream("./user.json",{overwrite:true}).on('error',error => {
      if(error) throw error;
  })
  writer.write(JSON.stringify(dummyData,null,2));
  resolve(dummyData);
    res.json(dummyData[user_id]);
  },1000);
});

router.delete("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  dummyData.splice(user_id,1);
  new Promise(function (resolve, reject){
    let writer =fs.createWriteStream("./user.json",{overwrite:true}).on('error',error => {
      if(error) throw error;
  })
  writer.write(JSON.stringify(dummyData,null,2));
  resolve(dummyData);
    res.json(dummyData[user_id]);
  },1000);
});

module.exports = router;