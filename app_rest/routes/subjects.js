const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateSubject(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .required(),
                    
        book: Joi.string(),
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


rtr.get('/subjects',(req, res) => {
    Subjects.findAll()
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.get('/subjects/:id',(req, res) => {
    //Ovde treba provera podataka
    Subjects.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/subjects/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }

    const obj={name:req.body.name,book:req.body.book};
    response = validateSubject(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Subjects.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});



rtr.put('/subjects/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    const obj={name:req.body.name,book:req.body.book};
    response = validateSubject(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Subjects.findOne({where: {id: req.params.id}})
    .then(sub=>{
        sub.name=req.body.name;
        sub.book=req.body.book;
        sub.save()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
    }
});

rtr.delete('/subjects/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    Subjects.findOne({where: {id: req.params.id}})
    .then(sub=>{
        sub.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});









module.exports=rtr;