const {sequelize,Users,Messages,Subjects,Announcments,Notification,Classrooms,Students,Professors,Classes,Schedules,Lessons,Grades,Apperances} = require('../models');
const express = require('express');
const announcments = require('../models/announcments');
const rtr=express.Router();
const jwt=require('jsonwebtoken');
// Biblioteka za validaciju unosa
const Joi = require('joi');
rtr.use(express.json());
rtr.use(express.urlencoded({extended:true}));

function validateGrade(user)
{
    const JoiSchema = Joi.object({
      
        grade: Joi.number()
                  .min(1)
                  .max(5)
                  .required(),

        studentId: Joi.number()
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

rtr.get('/grades',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    //Messages.findAll({ include: ['Users'] })
        Grades.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

rtr.get('/grades/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Grades.findOne({ where: { id: req.params.id } })
    .then(rows=>res.json(rows))
    .catch(err=>res.status(500).json(err));
});

rtr.post('/grades/',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    const obj={grade:req.body.grade,studentId:req.body.studentId,subjectId:req.body.subjectId};
    response = validateGrade(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Grades.create(obj)
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
});

rtr.put('/grades/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }

    const obj={grade:req.body.grade,studentId:req.body.studentId,subjectId:req.body.subjectId};
    response = validateGrade(obj);
  
    if(response.error)
    {  
        console.log(response.error.details)
    }
    else
    {
        Grades.findOne({where: {id: req.params.id}})
        .then(usr=>{
            usr.grade=req.body.grade;
            usr.subjectId=req.body.subjectId;
            usr.studentId=req.body.studentId;
            usr.save()
            .then(rows=>res.json(rows))
            .catch(err=>res.status(500).json(err));
        }
        )
        .catch(err=>res.status(500).json(err));
    }

    
});
rtr.delete('/grades/:id',(req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator' && role!=='professor') {
        return res.sendStatus(403);
    }
    Grades.findOne({where: {id: req.params.id}})
    .then(usr=>{
        usr.destroy()
        .then(rows=>res.json(rows))
        .catch(err=>res.status(500).json(err));
    }
    )
    .catch(err=>res.status(500).json(err));
});














module.exports=rtr;