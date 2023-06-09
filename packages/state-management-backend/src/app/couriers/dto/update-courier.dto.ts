import { PartialType } from '@nestjs/swagger';
import { CreateCourierDto } from './create-courier.dto';
import { IsEmpty } from 'class-validator';

export class UpdateCourierDto extends PartialType(CreateCourierDto) {
  @IsEmpty({ message: 'Cant update Password' })
  password?: string;

  @IsEmpty({ message: 'cant update email' })
  email?: string;

  @IsEmpty()
  isDeleted?: boolean;
}
