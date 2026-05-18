import {IsString,IsEmail,IsOptional,IsDateString,MinLength,} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  full_name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  role!: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsDateString()
  hire_date!: Date;

  @IsOptional()
  @IsString()
  department_id?: string;

  @IsOptional()
  @IsString()
  address_id?: string;
}