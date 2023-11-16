const connection = require('./connection') 
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cors = require("cors");

app.use(cors());

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(bodyParser.json());
app.listen(3000, ()=>console.log('Express server is running on port 3000'));

//GET API - fetch all data
// Example http://localhost:3000/employees

app.get('/employees', (req,res)=>{
    connection.query('SELECT * FROM tbl_employees',(err, rows)=>{
        if(err) {
            console.log('error', err);
            } else {
            console.log(rows);
            res.send(rows);}
    });
});

//GET API with id - fetch a particular employee
// Example http://localhost:3000/employees/2

app.get('/employees/:id', (req,res)=>{
    connection.query('SELECT * FROM tbl_employees WHERE id=?',[req.params.id],(err, rows)=>{

        if(err) {
            console.log('error', err);
            } else {
            console.log(rows);
            res.send(rows);}
    });
});

// POST API & Sample Data
//Example http://localhost:3000/employees

// {
//     "name":"Maya",
//     "phone":"33333",
//     "address":"Qatar",
//     "designation":"Manager",
//     "email":"maya@test.com"
//     }


app.post('/employees', (req,res)=>{
    var emp = req.body;
   
    empData = [emp.name, emp.phone, emp.address, emp.email, emp.designation];
    connection.query('INSERT INTO tbl_employees(name, phone, address, email, designation) values(?)',[empData],(err, rows)=>{

        if(err) {
            console.log('error', err);
            } else {
            console.log(rows);
            res.send(rows);}
    });
});

//UPDATE API
//Example http://localhost:3000/employees/1

// {
//     "phone":"33333",
//     "address":"France",
//     "designation":"Manager",
//     "email":"maya@test.com"
//     }

app.patch('/employees', (req,res)=>{
    var emp = req.body;
    empData = [emp.name, emp.phone, emp.address, emp.email, emp.designation];
    connection.query('UPDATE tbl_employees SET ? WHERE id='+emp.id,[emp],(err, rows)=>{

        if(err) {
            console.log('error', err);
            } else {
            console.log(rows);
            res.send(rows);}
    });
});

//DELETE API
// Example http://localhost:3000/employees/1

app.delete('/employees/:id', (req,res)=>{
    connection.query('DELETE FROM tbl_employees WHERE id=?',[req.params.id],(err, rows)=>{

        if(err) {
            console.log('error', err);
            } else {
            res.send(rows);}
    });
});



// app.put('/employees', (req,res)=>{
//     var emp = req.body;
//     empData = [emp.name, emp.phone, emp.address, emp.email, emp.designation];
//     connection.query('IUPDATE employees SET ? WHERE id='+emp.id,[emp],(err, rows)=>{

//         if(err) {
//             console.log('error');
//             } else {
//             console.log(rows);
//             res.sent(rows);}
//     });
// });