const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
//Ako nam u bodiju rekvesta stoje enkodovani podaci ovi middleweri ce konvervoati u js objekat
rtr.use(express.urlencoded({extended:true}));

function validateUser(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .min(1)
                  .max(30)
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(), 
                 
        password: Joi.string()
               .min(5)
               .max(30)
               .required(),

        admin: Joi.string()
               .required(),


    });
  
    return JoiSchema.validate(user)
}


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json((err)=>{ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

rtr.use(authToken);


rtr.get('/messages',(req, res) => {
        Messages.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});



rtr.get('/messages/:id',(req, res) => {
    //Ovde treba provera podataka
    Messages.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});


rtr.post('/messages/',(req, res) => {
    //Ovde treba provera podataka
    Messages.create({content:req.body.content,userId:req.body.userId})
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});


rtr.put('/messages/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    Messages.findOne({where: {id: req.params.id}})
    .then(msg=>{
        msg.content=req.body.content;
        msg.save()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});




rtr.delete('/messages/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    Messages.findOne({where: {id: req.params.id}})
    .then(msg=>{
        msg.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});

module.exports=rtr;

