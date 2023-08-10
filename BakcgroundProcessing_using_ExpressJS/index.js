const express = require('express');
const Queue = require('bull');
const { sendMail } = require('./sendMail.service');
const myQueue = new Queue('testing-queue','redis://127.0.0.1:6379')
const moment = require('moment')
const app = express()

let count = 1
app.use(express.urlencoded())
app.use(express.json())
app.post('/send',async(req,res)=>{
    const {toEmail,ccEmail,subject,html} = req.body
    await myQueue.add({
        ...req.body
    });
    res.json({
        success:true,
        message:"Email sending process started."
    })
})
app.listen(8000,()=>{
    console.log("app running on port : 8000")
})

myQueue.process(async function(job,done){
    console.log("Processing job : "+job.id)
    await sendMail(job.data.toEmail,job.data.ccEmail,job.datasubject,job.data.html,job.id,done)
    
})

myQueue.on('completed',async function(job,result){
    console.log("Job-"+job.id+" at time : ( "+ moment().format('hh:mm a') +" ),  completed with result : "+JSON.stringify(result))
})