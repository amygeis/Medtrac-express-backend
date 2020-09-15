const express = require("express");
const router = express.Router();
const Medicine = require("../models").Medicine;
const User=require("../models").User;
const MedPic=require("../models").MedPic

//POST for new/create
router.post('/', (req,res) => {
    MedPic.create(req.body).then((newPic) => {
       res.json({newPic}); 
    });
});

module.exports = router;