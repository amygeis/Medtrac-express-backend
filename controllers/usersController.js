const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Time = require("../models").Time;
const Medicine = require("../models").Medicine;
const UserModel = require("../models").User;
const UserMed = require("../models").UserMed;


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

//GET USER MED SCHEDULE
router.get("/schedule/:id", (req,res)=>{
  username=req.user.username;
  if (req.user.id == req.params.id) {
  UserModel.findByPk(req.params.id, {
    include:[{
      model: Medicine,
      attributes:["id","name"]
    },
  {
    model:Time,
    attributes:["id","time"] 
  },
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

module.exports = router;
