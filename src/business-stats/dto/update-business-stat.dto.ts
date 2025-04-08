import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessStatDto } from './create-business-stat.dto';

export class UpdateBusinessStatDto extends PartialType(CreateBusinessStatDto) {}
