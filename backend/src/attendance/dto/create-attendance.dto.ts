import { IsString, IsDateString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  employee_id: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsDateString()
  check_in_time?: string;

  @IsOptional()
  @IsDateString()
  check_out_time?: string;

  @IsOptional()
  @IsNumber()
  total_hours?: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  device_info?: string;
}

export class UpdateAttendanceDto {
  @IsOptional()
  @IsDateString()
  check_in_time?: string;

  @IsOptional()
  @IsDateString()
  check_out_time?: string;

  @IsOptional()
  @IsNumber()
  total_hours?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  device_info?: string;
}
