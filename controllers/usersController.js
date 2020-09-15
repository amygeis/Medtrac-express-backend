const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Time = require("../models").Time;
const Medicine = require("../models").Medicine;
const UserModel = require("../models").User;
const UserMed = require("../models").UserMed;
const MedPic = require("../models").MedPic


// GET USERS PROFILE
router.get("/profile/:id", async (req, res) => {
  username = req.user.username;
  if (req.user.id == req.params.id) {
    let user = await UserModel.findByPk(req.params.id);
    res.json({ user, username });
  }
  else{
    res.json("unauthorized");
  }
});

// UPDATE USERS PROFILE
router.put("/profile/:id", async (req, res) => {
  let updatedUser = await UserModel.update(req.body,{
    where: {id: req.params.id},
    returning: true,
  });
  res.json(updatedUser);
})
  


//GET USER MED SCHEDULE
router.get("/schedule/:id", (req,res)=>{
  username=req.user.username;
  if (req.user.id == req.params.id) {
  UserModel.findByPk(req.params.id, {
    include:[{
      model: Medicine,
      attributes:["id","rxcui","name"]
    },
  {
    model:Time,
    attributes:["id","time"] 
  },
  {
    model:MedPic,
    attributes:["rxcui","imgname","img"]
  }
  ]
  }).then((user)=>{
    Medicine.findAll().then((allMeds)=>{
      Time.findAll().then((allTimes)=>{
        UserMed.findAll({
          where: {
            userId:req.params.id
          }
        }).then((allUserMeds)=>{
          res.json({
          user:user,
          medicines:allMeds,
          times:allTimes,
          userMeds:allUserMeds,
          username:username,
          })  
      })
    })
      
      });
  })
} else {
    res.json("unauthorized");
    //res.redirect("/");
}
});

//GET LIST OF USER MEDICINES
router.get("/list/:id", (req,res) =>{
  username=req.user.username;
  if (req.user.id == req.params.id){
    UserMed.findAll({
      where :{
        userId:req.params.id
      },
      attributes : ['medId', [sequelize.fn('count', sequelize.col('medId')),'medCount']],
      group: ['UserMed.medId'],
      raw: true,
      order: ['medId']
    }).then((allUserMeds)=>{
      console.log(allUserMeds)
      Medicine.findAll().then((allMeds)=>{
        UserModel.findByPk(req.params.id).then((user)=>{
          res.json({
          userMeds:allUserMeds,
          medicines:allMeds,
          user:user,
        })
      })
      })  
    })
  }
})

//ADD NEW USER MED TO SCHEDULE
router.put("/schedule/:id", (req,res) => {
  console.log(req.body)
  UserMed.create({
    userId: req.params.id,
    timeId: req.body.time,
    medId: req.body.medicine,  
  }).then(()=>{
      res.json({
        userId: req.params.id,
    timeId: req.body.time,
    medId: req.body.medicine,
      })
    })
  })

// delete route
router.delete('/schedule/:id', (req,res) => {
  let userMedId=req.params.id;
  let userId = ""
  UserMed.findByPk(userMedId).then((userMedRow)=>{
    userId = userMedRow.userId;
    return UserMed.destroy({where: {id: req.params.id}})
  }).then(()=>{
console.log(userId)
  res.json({message: `Medicine/time with id ${req.params.id} was deleted for user ${userID}`,})
  })
});

module.exports = router;
