const express =require('express');
const app=express();
const mongoose = require('./database/mongoose');
const cors = require('cors');

const TaskList = require('./database/models/taskList')
const Task = require('./database/models/task');

app.use(express.json());
// Enable CORS for all routes
app.use(cors());


app.get('/tasklists',(req,res)=>{
TaskList.find({})
.then((lists)=>
{
    res.send(lists)
    res.status(200);

})
.catch((error)=>{console.log('error')});
});
app.get('/tasklists/:tasklistId',(req,res)=>{
    let tasklistId= req.params.tasklistId;
    TaskList.find({_id:tasklistId}) 
    .then((taskList)=>
    {
        res.send(taskList)
        res.status(200);
    
    })
    .catch((error)=>{console.log('error')});
    }   );
app.post('/tasklists',(req,res)=>{
  let taskListObj ={'title':req.body.title}
  TaskList(taskListObj).save()
  .then((lists)=>{
    res.status(201);
    res.send(lists)
    
})
.catch((error)=>{console.log('error')});

})
app.put('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set:req.body})
    .then((taskList)=>
    {
        res.send(taskList)
        res.status(200);
    
    })
    
    .catch((error)=>{console.log('error')});
});
app.delete('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findByIdAndDelete({_id:req.params.tasklistId})
    .then((taskList)=>
    {
        res.send(taskList)
        res.status(201);
    
    })
    
    .catch((error)=>{console.log('error')});
});


app.listen(3000,function(){
    console.log('sever started on port 3000')
})