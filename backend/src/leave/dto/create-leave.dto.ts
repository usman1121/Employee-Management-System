import { IsString, IsDateString, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateLeaveDto {
  @IsUUID()
  employee_id: string;

  @IsUUID()
  leave_type_id: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateLeaveDto {
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsUUID()
  approved_by?: string;
}
