import { BullModule,InjectQueue,OnQueueCompleted } from '@nestjs/bull';
import { Queue } from 'bull';
import moment from 'moment'

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

// queue consumer need to be made for each queue created.
// queue-consumer need to be added in providers so that bull module can use it to process queue

@Processor('myQueue')
export class QueueConsumer {
  constructor(private readonly emailService : EmailService){}
  // process is function to be used to handle the processing of jobs of queue
  @Process()
  async handleMyQueue(job:Job,done:Function){
    console.log("Processing job : "+job.id)
    await this.emailService.sendMail(job.data.toEmail,job.data.ccEmail,job.data.subject,job.data.html,job.id.toString(),done)    
  }

  // event listners need to be placed inside the consumer class
  @OnQueueCompleted()
  onComplete(job: Job,result:any) {
    console.log("Job-"+job.id+" at time : ( "+ moment().format('hh:mm a') +" ),  completed with result : "+JSON.stringify(result))
  }
}