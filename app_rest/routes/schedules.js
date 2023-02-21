const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateSchedule(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
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
rtr.get('/schedules',(req, res) => {
    Schedules.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

rtr.get('/schedules/:id',(req, res) => {
    //Ovde treba provera podataka
    Schedules.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/schedules/',(req, res) => {
    const { role } = req.user;   
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={name:req.body.name,classId:req.body.classId};
    response = validateSchedule(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Schedules.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/schedules/:id',(req, res) => {
    const { role } = req.user;   
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={name:req.body.name,classId:req.body.classId};
    response = validateSchedule(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Schedules.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.name=req.body.name;
            usr.classId=req.body.classId;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }

});

rtr.delete('/schedules/:id',(req, res) => {
    const { role } = req.user;   
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Schedules.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});

















module.exports=rtr;