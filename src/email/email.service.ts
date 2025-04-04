import { Injectable } from '@nestjs/common';  
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(createEmailDto: CreateEmailDto) {
    const { email, name } = createEmailDto;

      try {
        const emailSent = await this.mailerService.sendMail({
          to: email,
          // from: ya tiene por defecto el corro que se definio
          subject: 'Recordatorio', //Es el titulo
          template: 'welcome', //Aqui el nombre del template sin la extension
          context: {
            // Aqui se pone lo que va ir a la plantilla
            name,
            email
          },
        });
        
        return emailSent
        
      } catch (error) {
        console.log(error);
        
      }
  }
}