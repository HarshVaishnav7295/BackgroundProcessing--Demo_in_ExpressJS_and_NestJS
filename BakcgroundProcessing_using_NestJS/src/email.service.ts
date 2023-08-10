import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as moment from 'moment';
@Injectable()
export class EmailService {
    constructor(private readonly mailService : MailerService){}
    
    async sendMail(to:string[],cc:string[],subject:string,html:string,jobId:string,done:Function){
        let newHtml = html + `
            <hr />
            <h5>JobID :: ${jobId}</h5>
            <h5>Time :: ${moment().format('hh:mm a')}</h5>
        `
        this.mailService.sendMail({
            to : to,
            cc : cc,
            subject : subject,
            html : newHtml
        }).then((data)=>{
            //console.log("Data from result of mail success : ",data)
            console.log("Mail sent at time :->",moment().format('hh:mm a'))
            // Done : 1st -> error, 2nd-> result data
            done(null,{
                msg:"Job-"+jobId+" completed"
            })
        }).catch((err)=>{
            console.log("Error from email at time : ",moment().format('hh:mm a'))
            console.log("Error msg : ",err)
        })
    }
}