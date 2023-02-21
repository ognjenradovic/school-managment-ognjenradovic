const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateAnnouncments(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string().required(),

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

rtr.get('/announcments',(req, res) => {
    Announcments.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

rtr.get('/announcments/:id',(req, res) => {
    //Ovde treba provera podataka
    Announcments.findOne({ where: { id: req.params.id },include:['Notifications']})
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/announcments/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={name:req.body.name};
    response = validateAnnouncments(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Announcments.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/announcments/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    } 

    const obj={name:req.body.name};
    response = validateAnnouncments(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
    Announcments.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.name=req.body.name;
        usr.save()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
    }
});

rtr.delete('/announcments/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Announcments.findOne({where: {id: req.params.id}})
    .then(sub=>{
        sub.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});



module.exports=rtr;