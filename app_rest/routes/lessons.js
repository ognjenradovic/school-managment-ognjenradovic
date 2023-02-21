const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateLesson(user)
{
    const JoiSchema = Joi.object({
      
        number: Joi.number()
                  .required(),
                    
        lessonDate: Joi.string().required(),
                 
       time: Joi.number()
               .required(),

       scheduleId: Joi.number()
               .required(),

       classroomId: Joi.number()
               .required(),

       subjectId: Joi.number()
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


rtr.get('/lessons',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    //Messages.findAll({ include: ['Users'] })
        Lessons.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );


        
});


rtr.get('/lessons/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Lessons.findOne({ where: { id: req.params.id },include:{ all: true, nested: true } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/lessons/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    const obj={number:req.body.number,scheduleId:req.body.scheduleId,subjectId:req.body.subjectId,time:req.body.time,lessonDate:req.body.lessonDate,lessonDate:req.body.lessonDate,classroomId:req.body.classroomId};
    response = validateLesson(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Lessons.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/lessons/:id',(req, res) => {
    //Ovde treba provera autentifikcaije i autorizacije
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    const obj={number:req.body.number,scheduleId:req.body.scheduleId,subjectId:req.body.subjectId,time:req.body.time,lessonDate:req.body.lessonDate,lessonDate:req.body.lessonDate,classroomId:req.body.classroomId};
    response = validateLesson(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Lessons.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.number=req.body.number;
            usr.scheduleId=req.body.scheduleId;
            usr.subjectId=req.body.subjectId;
            usr.classroomId=req.body.classroomId;
            usr.time=req.body.time;
            usr.lessonDate=req.body.lessonDate;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }


});

rtr.delete('/lessons/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    //Ovde treba provera autentifikcaije i autorizacije
    Lessons.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});














module.exports=rtr;