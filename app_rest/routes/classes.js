const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateClass(user)
{
    const JoiSchema = Joi.object({
      
        number: Joi.number()
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

rtr.get('/classes',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Classes.findAll({include:['Students']})
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );

    
});

rtr.get('/classes/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Classes.findOne({ where: { id: req.params.id} ,include:['Students']})
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/classes/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={number:req.body.number};
    response = validateClass(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Classes.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/classes/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }

    const obj={number:req.body.number};
    response = validateClass(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Classes.findOne({where: {id: req.params.id}})
        .then(cls=>{
            cls.number=req.body.number;
            cls.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }




});


rtr.delete('/classes/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    //Ovde treba provera autentifikcaije i autorizacije
    Classes.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});













module.exports=rtr;