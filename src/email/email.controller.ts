import { Controller, Post, Body } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailService } from './email.service';

@Controller('/emails')
export class EmailController {
  constructor(private emailsService: EmailService) {}

  @Post("/send")
  async sendEmail(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.sendEmail(createEmailDto);
  }
}