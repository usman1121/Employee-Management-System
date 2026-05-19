import {IsOptional,IsString,IsEmail,IsDateString,} from 'class-validator';

export class AdminUpdateEmployeeDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsDateString()
  hire_date?: Date;

  @IsOptional()
  @IsString()
  department_id?: string;

  @IsOptional()
  @IsString()
  address_id?: string;
}