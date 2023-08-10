import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { QueueConsumer } from './queue.consumer';

@Module({
  imports: [
    // config. for bull module need to be added in main module
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // queue needed to be registerd in module where the queue consumer is placed
    BullModule.registerQueue({
      name: 'myQueue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port : 587,
        auth: {
          user: 'techtic.harshvaishnav@gmail.com',
          pass: 'qbgujzbzpghfmkaj',
        },
      },
    })
  ],
  controllers: [AppController],
// queue-consumer need to be added in providers so that bull module can use it to process queue
  providers: [AppService,EmailService,QueueConsumer],
})
export class AppModule {}
