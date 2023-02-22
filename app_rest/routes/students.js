const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateStudent(user)
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
        classId: Joi.number()
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

rtr.get('/students',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Students.findAll({include:{ all: true, nested: false }})
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.get('/students/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Students.findOne({ where: { id: req.params.id} ,include:{ all: true, nested: false }})
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

// rtr.post('/register/',(req, res) => {

//     const student={name:req.body.name,email:"placeholder@gmail.com",password:req.body.password,classId:1};
  
//         Students.create(student)
//         .then(rows=>res.json(rows))
//         .catch(err=>res.status(500).json(err));

// });


rtr.post('/students/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const student={name:req.body.name,email:req.body.email,password:req.body.password,classId:req.body.classId};
    response = validateStudent(student);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Students.create(student)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/students/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const student={name:req.body.name,email:req.body.email,password:req.body.password,classId:req.body.classId};
    response = validateStudent(student);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Students.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.name=req.body.name;
            usr.email=req.body.email;
            usr.password=req.body.password;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }
});

rtr.delete('/students/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Students.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});















module.exports=rtr;