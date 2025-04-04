import { Module } from '@nestjs/common'; 
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
const isDev = process.env.NODE_ENV !== 'production';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'creacionesrd922@gmail.com',
          pass: 'tpvq jhlb gibw qhbk',
        },
      },
      defaults: {
        from: '"Acabados y estilos en madera 🛠️" <ferreteria@acabadosyestilosenmadera.com>',
      },
      template: {
        dir: isDev
    ? join(process.cwd(), 'src/email/templates')
    : join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
