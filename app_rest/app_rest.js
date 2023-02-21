//Express

const express = require('express');
const app = express();
const path = require('path');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
//Importujem middlewear (setujemo da nam static bude nas folder 'static')
app.use(express.static(path.join(__dirname, 'static')));


//Importujemo direktorijum (index.js)
const {sequelize}=require('./models');

//REST Api
const rMessages= require('./routes/messages.js');
const rUsers= require('./routes/users.js');
const rStudents= require('./routes/students.js');
const rGrades= require('./routes/grades.js');
const rLessons= require('./routes/lessons.js');
const rProfessors= require('./routes/professors.js');
const rClasses= require('./routes/classes.js');
const rClassrooms= require('./routes/classrooms.js');
const rSchedules= require('./routes/schedules.js');
const rSubjects= require('./routes/subjects.js');
const rAnnouncments= require('./routes/announcments.js');
const rNotifications= require('./routes/notifications.js');
const rApperances= require('./routes/apperances.js');

require('dotenv').config();
//************************************************************** */
//Sve rute koje pocinju sa api trazi ih u messages folderu

app.use('/api',rUsers);
app.use('/api',rStudents);
app.use('/api',rProfessors);
app.use('/api',rGrades);
app.use('/api',rClasses);
app.use('/api',rClassrooms);
app.use('/api',rSchedules);
app.use('/api',rAnnouncments);
app.use('/api',rSubjects);
app.use('/api',rNotifications);
app.use('/api',rApperances);
app.use('/api',rLessons);

//Ovde frontend vadi token iz cookiea


app.listen(8080, async ()=>{
    await sequelize.authenticate();
});