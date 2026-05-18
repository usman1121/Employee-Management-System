import { IsOptional, IsString } from 'class-validator';

export class UserUpdateProfileDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  position?: string;
}