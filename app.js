const express =require('express');
const app=express();

const mongoose = require('./database/mongoose')

app.listen(3000,function(){
    console.log('sever started on port 3000')
})