const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
const { validate } = require('joi/lib/types/lazy');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateNotification(user)
{
    const JoiSchema = Joi.object({
      
        content: Joi.string()
                  .required(),
                    
        announcmentID: Joi.number().required(), 
            
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

rtr.get('/notifications',(req, res) => {
    Notification.findAll()
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

rtr.get('/notifications/:id',(req, res) => {
    //Ovde treba provera podataka
    Notification.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});
rtr.post('/notifications/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={content:req.body.content,announcmentID:req.body.announcmentID};
    response = validateNotification(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Notification.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/notifications/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }


    const obj={content:req.body.content,announcmentID:req.body.announcmentID};
    response = validateNotification(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Notification.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.content=req.body.content;
            usr.announcmentID=req.body.announcmentID;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }


});

rtr.put('/notifications/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Notification.findOne({where: {id: req.params.id}})
    .then(msg=>{
        msg.content=req.body.content;
        msg.save()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});

rtr.delete('/notifications/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Notification.findOne({where: {id: req.params.id}})
    .then(sub=>{
        sub.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});













module.exports=rtr;