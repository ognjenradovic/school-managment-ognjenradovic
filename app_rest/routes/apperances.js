const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateApperance(user)
{
    const JoiSchema = Joi.object({
      
        notes: Joi.string()
                  .required(),
                    
        lessonId: Joi.number()
               .required(),

        studentId: Joi.number()
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


rtr.get('/apperances',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
        Apperances.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

rtr.get('/apperances/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Apperances.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});


rtr.post('/apperances/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    const obj={notes:req.body.notes,lessonId:req.body.lessonId,studentId:req.body.studentId};
    response = validateApperance(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Apperances.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }  
});

rtr.put('/apperances/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }

    const obj={notes:req.body.notes,lessonId:req.body.lessonId,studentId:req.body.studentId};
    response = validateApperance(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Apperances.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.notes=req.body.notes;
            usr.lessonId=req.body.lessonId;
            usr.studentId=req.body.studentId;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }  
});

rtr.delete('/apperances/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Apperances.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});
















module.exports=rtr;