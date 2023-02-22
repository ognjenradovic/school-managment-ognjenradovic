const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
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

rtr.get('/users',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Users.findAll()
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.get('/users/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Users.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/users/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    const user={name:req.body.name,email:req.body.email,password:req.body.password,admin:req.body.admin};
    response = validateUser(user);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Users.create(user)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/users/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    //Ovde treba provera autentifikcaije i autorizacije
    const user={name:req.body.name,email:req.body.email,password:req.body.password,admin:req.body.admin};
    response = validateUser(user);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Users.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.name=req.body.name;
            usr.email=req.body.email;
            usr.password=req.body.password;
            usr.admin=req.body.admin;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }
});

rtr.get('/users/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    Users.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.delete('/users/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    //Ovde treba provera autentifikcaije i autorizacije
    Users.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});




module.exports=rtr;