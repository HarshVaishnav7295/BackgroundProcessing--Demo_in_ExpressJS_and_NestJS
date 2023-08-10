const moment = require('moment');
const nodeMailer = require('nodemailer')
const transporter = nodeMailer.createTransport({
    
    host: "smtp.gmail.com",
    service: 'Gmail',
    port: 587,
    auth: {
        user: 'techtic.harshvaishnav@gmail.com',
        pass: 'qbgujzbzpghfmkaj'
    }
    
});

const sendMail = async(toEmail=[],ccEmail=[],subject="Testing Background Processing",html="<h1>Testing Background processing testing.</h1>",jobId,done)=>{
    try{
        let newHtml = html + `
            <hr />
            <h5>JobID :: ${jobId}</h5>
            <h5>Time :: ${moment().format('hh:mm a')}</h5>
        `
        transporter.sendMail({
            from : "techtic.harshvaishnav@gmail.com",
            to : toEmail,
            cc : ccEmail,
            subject : subject,
            html : newHtml
        })
        .then((data)=>{
            //console.log("Data from result of mail success : ",data)
            console.log("Mail sent at time :->",moment().format('hh:mm a'))
            // Done : 1st -> error, 2nd-> result data
            done(null,{
                msg:"Job-"+jobId+" completed"
            })
        })
        .catch((err)=>{
            console.log("Error from email at time : ",moment().format('hh:mm a'))
            console.log("Error msg : ",err)
        })
    }catch(error){
        return {
            success:false,
            error:error.message
        }
    }
}

module.exports = {
    sendMail
}