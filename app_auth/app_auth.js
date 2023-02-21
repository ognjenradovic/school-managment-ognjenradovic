const express = require('express');
const { sequelize, Users,Professors,Students } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PORT = process.env.PORT || 3030;

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*',         //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        classId:req.body.classId
    };

    Students.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name,
            role:"student"
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    if(req.body.accType==="admin" || req.body.accType==="moderator"){
        Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
            if (req.body.password===usr.password) {
                let obj;
                if(usr.admin){

                obj = {
                    userId: usr.id,
                    role:"admin",
                    user: usr.name
                };
            }
            else{
                obj = {
                    userId: usr.id,
                    role:"moderator",
                    user: usr.name
                };
            }
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
    }

    else if(req.body.accType==="professor"){
        Professors.findOne({ where: { name: req.body.name } })
        .then( usr => {
            //if (bcrypt.compareSync(req.body.password, usr.password)) {
            if (req.body.password===usr.password) {
                const obj = {
                    userId: usr.id,
                    role:"professor",
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
    }
    else if(req.body.accType==="student"){
        Students.findOne({ where: { name: req.body.name } })
        .then( usr => {
            //if (bcrypt.compareSync(req.body.password, usr.password)) {
            if (req.body.password===usr.password) {
                const obj = {
                    userId: usr.id,
                    role:"student",
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
    }


    

    
});

app.listen({ port: 9000 }, async () => {
    console.log("Listening on port 9000");
    await sequelize.authenticate();
});