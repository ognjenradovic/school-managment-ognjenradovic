//Express

const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
//Za joinovanje putanja
const path = require('path');
// const PORT = process.env.PORT || 3030;

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
//Importujem middlewear (setujemo da nam static bude nas folder 'static')
app.use(express.static(path.join(__dirname, 'static')));

app.get('/skripta.js', function(req, res, next) {  
    console.log("before redirection");
    res.sendfile('static/temp/skripta.js'); 
});

//Za parsiranje tela
const BP = require('body-parser');
app.use(BP.urlencoded({extended: false}));
// app.use('/login', BP.json());  // Mozemo ograniciti middleware na samo jednu rutu

// Biblioteka za validaciju unosa
const Joi = require('joi');


//Ovde frontend vadi token iz cookiea
function authToken(req,res,next){
    const cookies=getCookies(req);
    const token=cookies['token'];


    if(token==null){
        return res.redirect(301,'/login');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.redirect(301,'/login');
        req.user=user;
    });
    next();
}

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};


app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});
app.get('/', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});
app.get('/index', (req, res) => {
    res.sendFile('temp/index.html', { root: './static' });
});


// app.get('/admin/users',authToken, (req, res) => {
//    res.sendFile(path.join(__dirname, 'static', 'users.html'));
// });

app.get('/admin/users', authToken, (req, res) => {
     const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/admin.html'));
});

app.get('/admin/subjects', authToken, (req, res) => {
    console.log(res);
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/subjects.html'));
});

app.get('/admin/announcments', authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/announcments.html'));
});
app.get('/admin/classrooms',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/classrooms.html'));
});
app.get('/admin/notifications',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/notifications.html'));
});
app.get('/admin/students',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/students.html'));
});
app.get('/admin/professors',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/professors.html'));
});
app.get('/admin/classes',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/classes.html'));
});
app.get('/admin/schedules',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/schedules.html'));
});
app.get('/admin/lessons',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/lessons.html'));
});
app.get('/admin/apperances',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/apperances.html'));
});
app.get('/admin/grades',authToken, (req, res) => {
    const { role } = req.user;    
    if (role !== 'admin' && role!=='moderator') {
        return res.sendStatus(403);
    }
    res.sendFile(path.join(__dirname, 'static', 'admin/grades.html'));
});


app.listen(8000, async ()=>{
    console.log("Listening on port 8000")
});
module.exports = {
    authToken
  };
