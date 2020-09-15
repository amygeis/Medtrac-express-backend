const express = require("express");
const router = express.Router();
const Medicine = require("../models").Medicine;
const User=require("../models").User;

//POST for new/create
router.post('/', (req,res) => {
    Medicine.create(req.body).then((newMedicine) => {
       res.json({newMedicine}); 
    });
});

// MEDICINE INDEX ROUTE
router.get("/", (req, res) => {
    username=req.user.username;
    Medicine.findAll({
        order: ['name']
    }).then((medicines) =>{
        User.findByPk(req.user.id).then((user)=>{
            res.json({
      medicines: medicines,
      user:user,
        })
        
        });
    });
  });

  router.get('/:id', (req, res) => {
    username=req.user.username;
    Medicine.findByPk(req.params.id).then((medicine) => {
        User.findByPk(req.user.id).then((user)=>{
            res.json( {
        medicine: medicine,
        user:user,
        })    
        });
    });
});

//edit route
router.get('/:id/edit', (req, res) => {
    username=req.user.username
    console.log(req.params.id)
    Medicine.findByPk(req.params.id).then((medicine) => {
        User.findByPk(req.user.id).then((user)=>{
            res.json({
            medicine: medicine, 
            user:user,
        })
            
            });
        });
    });

//  update route
router.put('/:id', (req, res) => { 
    Medicine.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedMed) => {
                res.json({updatedMed});
            });
        });

// delete route
router.delete('/:id', (req,res) => {
    Medicine.destroy({where: {id: req.params.id}}).then(() => {
    res.json({message: `Medicine with id ${req.params.id} was deleted`,});
    });    
});

module.exports = router;