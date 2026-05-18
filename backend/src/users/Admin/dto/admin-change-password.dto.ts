import { MinLength, IsString } from 'class-validator';

export class AdminChangePasswordDto {
  @IsString()
  employee_id!: string;

  @MinLength(6)
  newPassword!: string;
}