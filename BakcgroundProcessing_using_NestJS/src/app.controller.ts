import { Controller, Get,Post,Req,Res,Body } from '@nestjs/common';
import {Request,Response} from 'express'
import { AppService } from './app.service';
import { BullModule,InjectQueue,OnQueueCompleted } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueConsumer } from './queue.consumer';



@Controller()
export class AppController {
  // using the queue service of queue created with "myQueue" name in this module
  constructor(private readonly appService: AppService,@InjectQueue('myQueue') private myQueue :Queue) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/send')
  async send(@Req() req:Request,@Body() body:{
    toEmail:string[],
    ccEmail:string[],
    subject:string,
    html:string
  },@Res() res:Response){
    console.log("Called")
    // adding job in queue
    const job = await this.myQueue.add({
      ...body
    });
    return res.status(200).json({
      success:true,
      message:"Email send process started."
    })
  }
}
