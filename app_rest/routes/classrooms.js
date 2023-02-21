const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateClassroom(user)
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









rtr.get('/classrooms',(req, res) => {
    Classrooms.findAll()
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.get('/classrooms/:id',(req, res) => {

    Classrooms.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/classrooms/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={number:req.body.number};
    response = validateClassroom(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Classrooms.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});


rtr.put('/classrooms/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }



    const obj={number:req.body.number};
    response = validateClassroom(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Classrooms.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.number=req.body.number;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }



});







rtr.delete('/classrooms/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Classrooms.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});




module.exports=rtr;